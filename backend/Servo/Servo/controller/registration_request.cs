using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Servo.controller
{
    internal class registration_request
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');

            
            
            string email = "";
            string jelszo = "";
            string lastname = "";
            string firstname = "";

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
                    email = service.shared.b64dec(jsonObj["email"].ToString());
                    jelszo = service.shared.b64dec(jsonObj["password"].ToString());
                    lastname = service.shared.b64dec(jsonObj["lastname"].ToString());
                                        firstname = service.shared.b64dec(jsonObj["firstname"].ToString());
                }
                catch {

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

                if (false)
                {
                    var respon = new
                    {
                        status = "requirements_not_met",
                        statuscode = "403"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 403;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;
                }

                service.shared.log("Registration request: " + email + "  " + jelszo + "  (" + data.Request.RemoteEndPoint.Address.ToString() + ")");

                int resp = service.registration_request.process_registration_request(email, jelszo, lastname, firstname, data.Request.RemoteEndPoint.Address.ToString());
                if (resp == 200)
                {

                    var respon = new
                    {
                        status = "email_sent",
                        statuscode = "200"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
                {

                    var respon = new
                    {
                        status = "user_already_exists",
                        statuscode = "401"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    service.shared.log("Debug 1: controller.registration_request.main");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.registration_request");


                var respon = new
                {
                    status = "internal_error",
                    statuscode = "500"
                };

                string jsonrespon = JsonSerializer.Serialize(respon);


                data.Response.StatusCode = 500;
                byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                service.shared.log("response:500 (internal_error)");

            }
            


        }
    }
}
