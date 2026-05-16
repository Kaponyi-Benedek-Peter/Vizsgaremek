using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace Servo.controller
{
    internal class get_all_posts_admin
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');

            service.shared.log("1");




            string category = "";
            string sesstoken = "";
            string user_id = "";


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
                    category = service.shared.b64dec(jsonObj["category"].ToString());
                    sesstoken = service.shared.b64dec(jsonObj["session_token"].ToString());
                    user_id = service.shared.b64dec(jsonObj["user_id"].ToString());

                }
                catch
                {


                    var respon = new
                    {
                        status = "malformed_request",
                        statuscode = "400"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 400;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;

                }


                service.shared.log("Get all posts (admin) request: " + category + "  (" + data.Request.RemoteEndPoint.Address.ToString());



                //string json = $"{{\"token\":\"{token}\",\"expires_in\":604800}}"; // 7 nap




                service.shared.log("1.1");
                (int, string) resp = service.get_all_posts_admin.process_get_all_posts_admin(sesstoken,user_id,category); // SERVICE
                if (resp.Item1 == 200)
                {
                    data.Response.StatusCode = 200;
                    data.Response.ContentType = "application/json";
                    byte[] buffer = Encoding.UTF8.GetBytes(resp.Item2);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp.Item1 == 401)
                {

                    var respon = new
                    {
                        status = "auth_error",
                        statuscode = "401"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp.Item1 == 403)
                {

                    var respon = new
                    {
                        status = "permission_denied",
                        statuscode = "403"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }

                else if (resp.Item1 == 500)
                {

                    var respon = new
                    {
                        status = "internal_error",
                        statuscode = "500"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.get_all_posts");


                var respon = new
                {
                    status = "malformed_request",
                    statuscode = "400"
                };

                string jsonrespon = JsonSerializer.Serialize(respon);


                data.Response.StatusCode = 400;
                byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            finally
            {
                controller.router.safe_close(data);
            }
        }

    }
}
