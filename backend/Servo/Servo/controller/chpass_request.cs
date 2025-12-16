using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Servo.controller
{
    internal class chpass_request
    {



















        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');

            
            
            

            
       

            string id = "";
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
                id = service.shared.b64dec(jsonObj["id"].ToString());
                controller_jelszo = service.shared.b64dec(jsonObj["password"].ToString());
                }
                catch
                {

                    data.Response.StatusCode = 400;
                    byte[] buffer = Encoding.UTF8.GetBytes("hibas_request");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;
                }

                int resp = service.chpass_request.main(id, controller_jelszo, data.Request.RemoteEndPoint.Address.ToString());
                // SERVICE

                if (resp == 200)
                {
                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes("email_kuldve");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 401)
                {
                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes("felhasznalo_bannolva");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
                {
                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes("sze_v_felhasznalo_nem_letezik");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --controller.chpass_request");
                data.Response.StatusCode = 400;
                byte[] buffer = Encoding.UTF8.GetBytes("hibas_request");
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);

            }
            finally
            {
                data.Response.OutputStream.Close();
            }
        }




















    }
}
