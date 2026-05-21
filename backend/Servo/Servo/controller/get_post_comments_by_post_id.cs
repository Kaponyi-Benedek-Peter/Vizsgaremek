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
    internal class get_post_comments_by_post_id
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');






            string post_id = "";

            try
            {

                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    byte[] bodyBytes = new byte[data.Request.ContentLength64];
                    data.Request.InputStream.Read(bodyBytes, 0, bodyBytes.Length);
                    lenyeg = Encoding.UTF8.GetString(bodyBytes);
                }

                service.shared.log($"Body received: {lenyeg}");

                try
                {
                    JObject jsonObj = JObject.Parse(lenyeg);
                    post_id = service.shared.b64dec(jsonObj["post_id"].ToString());

                }
                catch (Exception ex)
                {
                    service.shared.log("inner catch: " + ex.Message);


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


                service.shared.log("Get comment by post id request: " + post_id + "  (" + data.Request.RemoteEndPoint.Address.ToString());



                //string json = $"{{\"token\":\"{token}\",\"expires_in\":604800}}"; // 7 nap




              
                string resp = service.get_post_comments_by_post_id.process_get_post_comments_by_post_id(post_id); //service
          

                if (resp != "error")
                {
                    data.Response.StatusCode = 200;
                    data.Response.ContentType = "application/json";
                    byte[] buffer = Encoding.UTF8.GetBytes(resp);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }

                else //if (resp == 500)
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
                service.shared.log($"Error 1: {ex.Message} --controller.get_post_comments_by_post_id");


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
