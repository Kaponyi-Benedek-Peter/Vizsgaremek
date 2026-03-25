using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Servo.controller
{
    internal class update_post_by_id
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string controller_user_id = "";
            string controller_session_token = "";

            string post_id = "";

            string title = "";
            string content = "";
            string image_url = "";
            string category_id = "";
            string slug = "";
            string except = "";
            string status = "";
            string views = "";
            string likes = "";
            string comment_count = "";
            string is_featured = "";
            string tags = "";

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

                    title = service.shared.b64dec(jsonObj["title"].ToString());
                    content = service.shared.b64dec(jsonObj["content"].ToString());
                    image_url = service.shared.b64dec(jsonObj["image_url"].ToString());
                    category_id = service.shared.b64dec(jsonObj["category_id"].ToString());
                    slug = service.shared.b64dec(jsonObj["slug"].ToString());
                    except = service.shared.b64dec(jsonObj["except"].ToString());
                    status = service.shared.b64dec(jsonObj["status"].ToString());
                    views = service.shared.b64dec(jsonObj["views"].ToString());
                    likes = service.shared.b64dec(jsonObj["likes"].ToString());
                    comment_count = service.shared.b64dec(jsonObj["comment_count"].ToString());
                    is_featured = service.shared.b64dec(jsonObj["is_featured"].ToString());
                    tags = service.shared.b64dec(jsonObj["tags"].ToString());
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

                service.shared.log("Update post request: " + title);

                int resp = service.update_post_by_id.process_update_post_by_id(
                    controller_user_id,
                    controller_session_token,
                    
                    post_id,

                    title,
                    content,
                    "", // created_at
                    image_url,
                    category_id,
                    "", // updated_at
                    slug,
                    except,
                    status,
                    views,
                    likes,
                    comment_count,
                    is_featured,
                    "", // published_at
                    "", // last_activity_at
                    tags
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
                service.shared.log($"Error: {ex.Message} --controller.update_post_by_id");

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