using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Servo.controller
{
    internal class ban_user
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');
            
            
            
            

          
            string admin_id = "";
            string admin_token = "";

            string user_id = "";
            string ban_reason = "";


            try
            {
                
                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");

                try { 
                JObject jsonObj = JObject.Parse(lenyeg);
                    admin_id = service.shared.b64dec(jsonObj["admin_id"].ToString());
                    admin_token = service.shared.b64dec(jsonObj["admin_token"].ToString());

                    user_id = service.shared.b64dec(jsonObj["user_id"].ToString());
                    ban_reason = service.shared.b64dec(jsonObj["ban_reason"].ToString());


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


               /* service.shared.log("User banned: " + email + "  " + jelszo + "  (" + data.Request.RemoteEndPoint.Address.ToString());

                int resp = service.login.main(jelszo, email); // SERVICE
                if (resp == 200)
                {
                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes("email_sent");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 401)
                {
                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes("wrong_password");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else //if (resp == 500)
                {
                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes("server_error_or_inexistent_user");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }*/
            }
            catch (Exception ex)
            {

                var respon = new
                {
                    status = "malformed_request",
                    statuscode = "400"
                };

                string jsonrespon = JsonSerializer.Serialize(respon);



                service.shared.log($"Error 1: {ex.Message}  --controller.ban_user.main");
                data.Response.StatusCode = 400;
                byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            finally
            {
                data.Response.OutputStream.Close();
            }
        }

    }
}
