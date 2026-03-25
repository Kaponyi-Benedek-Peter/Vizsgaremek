using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.PixelFormats;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Servo.service
{
    internal class upload_product_image_admin
    {
        private static readonly HttpClient _http = new HttpClient();
        private static readonly string HF_TOKEN = service.shared.conf("r", "hftoken");
        private const string HF_URL = "https://api-inference.huggingface.co/models/briaai/RMBG-1.4";

        public static int process_upload_product_image(string controller_admin_id, string controller_sesstoken, string controller_product_id, string image_b64, out string saved_filename, string transparency)
        {
            saved_filename = "";

            string admin_accstate = model.shared.get_account_state_by_id(controller_admin_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_admin_id);

            if (model_sesstoken != controller_sesstoken) return 401;
            if (admin_accstate != "admin" && admin_accstate != "superadmin") return 403;

            try
            {
                byte[] image_bytes = Convert.FromBase64String(
                    image_b64.Contains(",") ? image_b64.Split(',')[1] : image_b64
                );

                string product_dir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "public", "assets", "products", controller_product_id);
                Directory.CreateDirectory(product_dir);

                int max = Directory.GetFiles(product_dir, "*.webp")
                    .Select(f => int.TryParse(Path.GetFileNameWithoutExtension(f), out int n) ? n : 0)
                    .DefaultIfEmpty(0)
                    .Max();

                string output_path = Path.Combine(product_dir, $"{max + 1}.webp");

                byte[] result_bytes; // rembg

                if (transparency == "1") { 

                    using (var client = new System.Net.Http.HttpClient())
                    {
                        var content = new MultipartFormDataContent();
                        content.Add(new ByteArrayContent(image_bytes), "file", "image.png");

                        var response = Task.Run(() =>
                            client.PostAsync("http://localhost:7000/api/remove", content)
                        ).Result;

                        if (!response.IsSuccessStatusCode)
                        {
                            var error = response.Content.ReadAsStringAsync().Result;
                            throw new Exception($"Error: {response.StatusCode}, {error}");
                        }

                       result_bytes = response.Content.ReadAsByteArrayAsync().Result;
                    }
                }
                else
                {
                    result_bytes= image_bytes;
                }



                    //towebp
                    using (var ms = new MemoryStream(result_bytes))
                    using (var image = SixLabors.ImageSharp.Image.Load<Rgba32>(ms))
                    {
                        image.Save(output_path, new WebpEncoder { Quality = 85 });
                    }

                saved_filename = $"{max + 1}.webp";
                service.shared.log($"[upload] saved with bg removed: products/{controller_product_id}/{max + 1}.webp");
                return 200;
            }
            catch (UnknownImageFormatException)
            {
                return 422;
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException?.InnerException ?? ex.InnerException ?? ex;
                service.shared.log($"Error: {inner.Message} --service.upload_product_image_admin");
                return 500;
            }
        }
    }
}