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

                (int responsecode, string responsedata) resp = (418, "undefined");
                //
                try
                {

                     resp = service.chpass_promise.process_chpass_promise(id, token, data.Request.RemoteEndPoint.Address.ToString());

                }
                catch (Exception ex)
                {
                    service.shared.log($"Error 1: {ex.Message} --controller.chpass_promise.main");
                }
                //service.shared.log(resp.ToString());
                if (resp.responsecode == 410)
                {

                    var respon = new
                    {
                        status = "confirmation_lejart",
                        statuscode = "410"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 410;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp.responsecode == 200)
                {
                    data.Response.StatusCode = 200;

                    byte[] buffer = Encoding.UTF8.GetBytes(resp.responsedata);

                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp.responsecode == 404)
                {

                    var respon = new
                    {
                        status = "404",
                        statuscode = "confirmation_nem_letezik_vagy_hibas"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);


                
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
                {
                    service.shared.log($"Debug 1: {resp.responsecode} -controller.chpass_promise.main");



                    var respon = new
                    {
                        status = "confirmation_nem_letezik_vagy_hiba",
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
                service.shared.log($"Error 2: {ex.Message} -controller.chpass_promise.main");


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
                data.Response.OutputStream.Close();
            }
        }

















    }
}
