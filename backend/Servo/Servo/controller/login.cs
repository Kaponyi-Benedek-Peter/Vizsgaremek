using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace Servo.controller
{
    internal class login
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');

            
            
            

          
            string email = "";
            string jelszo = "";

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
                jelszo = service.shared.b64dec(jsonObj["password"].ToString());
                }
                catch
                {

                    data.Response.StatusCode = 400;
                    byte[] buffer = Encoding.UTF8.GetBytes("hibas_request");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;

                }


                service.shared.log("Login token request: " + email + "  " + jelszo + "  (" + data.Request.RemoteEndPoint.Address.ToString());



               
                    
                
               


                int resp = service.login.process_login(jelszo, email); // SERVICE
                if (resp == 200)
                {

                    string token = jwt_handler.generate_token(email);

                    
                    data.Response.ContentType = "application/json";
                    string json = $"{{\"token\":\"{token}\",\"expires_in\":604800}}"; // 7 nap


                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes(json);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 401)
                {
                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes("hibas_jelszo");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else //if (resp == 500)
                {
                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes("felhasznalo_nem_letezik");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.login.main");
                data.Response.StatusCode = 400;
                byte[] buffer = Encoding.UTF8.GetBytes("Hibas request");
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            finally
            {
                data.Response.OutputStream.Close();
            }
        }

    }
}
