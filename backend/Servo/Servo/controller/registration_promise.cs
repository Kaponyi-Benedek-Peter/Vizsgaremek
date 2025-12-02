using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Servo.controller
{
    internal class registration_promise
    {

        public static void main(HttpListenerContext data, string lenyeg)
        {
            
            
            


            string id = "";
            string confirmation_token = "";

            try
            {
                
                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }
                
                JObject jsonObj = JObject.Parse(lenyeg);
                try { 
                id = service.shared.b64dec(jsonObj["id"].ToString());
                confirmation_token = service.shared.b64dec(jsonObj["token"].ToString());
                }
                catch
                {

                    data.Response.StatusCode = 400;
                    byte[] buffer = Encoding.UTF8.GetBytes("hibas_request");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;
                }



                service.shared.log("Registration promise: " + id + "  " + confirmation_token + "  (" + data.Request.RemoteEndPoint.Address.ToString() + ")");

                int resp = service.registration_promise.main(id, confirmation_token);
                if (resp == 200)
                {
                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes("aktivalva");
                    service.shared.log("response:200 (aktivalva)");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 401)
                {
                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes("hibas_token");
                    service.shared.log("response:401 (hibas_token)");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else //if (resp == 500)
                {
                    service.shared.log(resp.ToString());
                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes("sze_v_felhasznalo_nem_letezik");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                    service.shared.log("response:500 (sze_v_felhasznalo_nem_letezik)");
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} -registration_promise.main");
                data.Response.StatusCode = 400;
                byte[] buffer = Encoding.UTF8.GetBytes("hibas_request");
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                service.shared.log("response:400 (hibas_request)");
            }
            finally
            {
                data.Response.OutputStream.Close();
            }
        }



































    }
}
