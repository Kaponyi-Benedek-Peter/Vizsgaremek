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
    internal class get_post
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');






            string id = "";
            string admin = "";
            string admin_id = "";
            string admin_token = "";

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
                    id = service.shared.b64dec(jsonObj["post_id"].ToString());
                    admin = service.shared.b64dec(jsonObj["admin"].ToString());

                    if (admin == "1")
                    {
                        admin_id = service.shared.b64dec(jsonObj["admin_id"].ToString());
                        admin_token = service.shared.b64dec(jsonObj["admin_session_token"].ToString());

                    }
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


                service.shared.log("Get post request: " + id + "  (" + data.Request.RemoteEndPoint.Address.ToString());



                //string json = $"{{\"token\":\"{token}\",\"expires_in\":604800}}"; // 7 nap





                string resp = service.get_post.process_get_post(id, admin, admin_id, admin_token); // SERVICE
                if (!resp.Contains("__error_"))
                {
                    data.Response.StatusCode = 200;
                    data.Response.ContentType = "application/json";
                    byte[] buffer = Encoding.UTF8.GetBytes(resp);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }

                else if (resp == "__error_permission_denied")
                {

                    var respon = new
                    {
                        status = "permission_denied",
                        statuscode = "403"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 403;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == "__error_incorrect_credentials")
                {
                    var respon = new
                    {
                        status = "incorrect_credentials",
                        statuscode = "401"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
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
                service.shared.log($"Error 1: {ex.Message} --controller.get_post");


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
