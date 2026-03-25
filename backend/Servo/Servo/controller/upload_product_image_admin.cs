using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Servo.controller
{
    internal class upload_product_image_admin
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string admin_id = "";
            string sesstoken = "";
            string product_id = "";
            string image_b64 = "";

            string transparency = "";

            try
            {
                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");

                try
                {
                    JObject jsonObj = JObject.Parse(lenyeg);
                    admin_id = service.shared.b64dec(jsonObj["admin_id"].ToString());
                    sesstoken = service.shared.b64dec(jsonObj["admin_session_token"].ToString());
                    product_id = service.shared.b64dec(jsonObj["product_id"].ToString());

                    transparency = service.shared.b64dec(jsonObj["transparency"].ToString());
                    image_b64 = jsonObj["image_b64"].ToString();
                }
                catch
                {
                    var respon = new { status = "malformed_request", statuscode = "400" };
                    data.Response.StatusCode = 400;
                    byte[] b = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(respon));
                    data.Response.OutputStream.Write(b, 0, b.Length);
                    return;
                }

                service.shared.log($"Image upload request: {admin_id} : product {product_id} ({data.Request.RemoteEndPoint.Address})");

                string saved_filename = "";
                int resp = service.upload_product_image_admin.process_upload_product_image(admin_id, sesstoken, product_id, image_b64, out saved_filename, transparency);

                if (resp == 200)
                {
                    data.Response.ContentType = "application/json";
                    var respon = new { status = "success", statuscode = "200", filename = saved_filename };
                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(respon));
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 422)
                {
                    data.Response.ContentType = "application/json";
                    var respon = new { status = "unsupported_image_format", statuscode = "422" };
                    data.Response.StatusCode = 422;
                    byte[] buffer = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(respon));
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 403)
                {
                    data.Response.ContentType = "application/json";
                    var respon = new { status = "permission_denied", statuscode = "403" };
                    data.Response.StatusCode = 403;
                    byte[] buffer = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(respon));
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 401)
                {
                    data.Response.ContentType = "application/json";
                    var respon = new { status = "incorrect_credentials", statuscode = "401" };
                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(respon));
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
                {
                    data.Response.ContentType = "application/json";
                    var respon = new { status = "internal_error", statuscode = "500" };
                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(respon));
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.upload_product_image_admin.main");
                var respon = new { status = "malformed_request", statuscode = "400" };
                data.Response.StatusCode = 400;
                byte[] buffer = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(respon));
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            finally
            {
                controller.router.safe_close(data);
            }
        }
    }
}