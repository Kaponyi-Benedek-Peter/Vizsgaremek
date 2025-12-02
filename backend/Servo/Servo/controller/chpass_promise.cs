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
    internal class chpass_promise
    {



        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');

            
            
            

            
            
            string id = "";
            string token = "";

            try
            {
                
                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");

                
                JObject jsonObj = JObject.Parse(lenyeg);
                id = service.shared.b64dec(jsonObj["id"].ToString());
                token = jsonObj["token"].ToString();

                service.shared.log("Password change promise: " + id + "  " + token + "  (" + data.Request.RemoteEndPoint.Address.ToString());
                int resp = 418;
                try
                {

                     resp = service.chpass_promise.main(id, token, data.Request.RemoteEndPoint.Address.ToString());

                }
                catch (Exception ex)
                {
                    service.shared.log($"Error: {ex.Message} --controller.chpass_promise.main");
                }
                //service.shared.log(resp.ToString());
                if (resp == 402)
                {
                    data.Response.StatusCode = 402;
                    byte[] buffer = Encoding.UTF8.GetBytes("megerosito_token_lejart");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 200)
                {
                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes("jelszo_megvaltoztatva");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
                {
                    data.Response.StatusCode = 400;
                    byte[] buffer = Encoding.UTF8.GetBytes("hibas_token");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} -controller.chpass_promise.main");
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
