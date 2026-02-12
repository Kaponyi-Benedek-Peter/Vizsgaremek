using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.Text;

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

                    data.Response.StatusCode = 400;
                    byte[] buffer = Encoding.UTF8.GetBytes("hibas_request");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;

                }

                service.shared.log("Registration request: " + email + "  " + jelszo + "  (" + data.Request.RemoteEndPoint.Address.ToString() + ")");

                int resp = service.registration_request.process_registration_request(email, jelszo, lastname, firstname, data.Request.RemoteEndPoint.Address.ToString());
                if (resp == 200)
                {
                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes("email kuldve " + email);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
                {
                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes("felhasznalo_mar_letezik");
                    service.shared.log("Debug 1: controller.registration_request.main");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.registration_request");
                data.Response.StatusCode = 500;
                byte[] buffer = Encoding.UTF8.GetBytes("sze_v_felhasznalo_nem_letezik");
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                service.shared.log("response:500 (hibas_request)");

            }
            


        }
    }
}
