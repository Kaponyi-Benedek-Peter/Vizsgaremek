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
    internal class chpass_request
    {



















        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');

            
            
            

            
       

            string email = "";
            string controller_jelszo = "";

            try
            {
                
                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");
                

                try { 
                JObject jsonObj = JObject.Parse(lenyeg);
                email = service.shared.b64dec(jsonObj["email"].ToString());
                controller_jelszo = service.shared.b64dec(jsonObj["password"].ToString());
                }
                catch
                {
                    service.shared.log($"Debug 1: hibas input --controller.chpass_request");

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
                int resp = 0;
                try
                {
                    resp = service.chpass_request.process_chpas_request(email, controller_jelszo, data.Request.RemoteEndPoint.Address.ToString());
                }
                catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --controller.chpass_request"); }

                    // SERVICE

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
                else if (resp == 401)
                {

                    var respon = new
                    {
                        status = "felhasznalo_bannolva",
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
                        status = "internal_error_or_inexistent_user",
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

                var respon = new
                {
                    status = "malformed_request",
                    statuscode = "400"
                };

                string jsonrespon = JsonSerializer.Serialize(respon);


                service.shared.log($"Error 2: {ex.Message} --controller.chpass_request");
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
