using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Servo.controller
{
    internal class delete_all_post_comments_by_post_id
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string controller_user_id = "";
            string controller_session_token = "";
            string post_id = "";

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

                    controller_user_id = service.shared.b64dec(jsonObj["user_id"].ToString());
                    controller_session_token = service.shared.b64dec(jsonObj["session_token"].ToString());

                    post_id = service.shared.b64dec(jsonObj["post_id"].ToString());
                }
                catch
                {
                    var respon_2 = new
                    {
                        status = "malformed_request",
                        statuscode = "400"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon_2);

                    data.Response.StatusCode = 400;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;
                }


                int resp = service.delete_post_comments_by_post_id.process_delete_post_comments_by_post_id(
                    controller_user_id,
                    controller_session_token,
                    post_id
                );

                if (resp == 200)
                {
                    var respon = new
                    {
                        status = "success",
                        statuscode = "200"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 200;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp == 400)
                {
                    var respon = new
                    {
                        status = "malformed_request",
                        statuscode = "400"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 400;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp == 403)
                {
                    var respon = new
                    {
                        status = "permission_denied",
                        statuscode = "403"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 403;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp == 500)
                {
                    var respon = new
                    {
                        status = "internal_error",
                        statuscode = "500"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 500;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp == 401)
                {
                    var respon = new
                    {
                        status = "incorrect_credentials",
                        statuscode = "401"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 401;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }



            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --controller.delete_post_comment_by_post_id");

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
    }
}