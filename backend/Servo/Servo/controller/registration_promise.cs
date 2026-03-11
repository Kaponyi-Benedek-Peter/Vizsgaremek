using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
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



                service.shared.log("Registration promise: " + id + "  " + confirmation_token + "  (" + data.Request.RemoteEndPoint.Address.ToString() + ")");

                int resp = service.registration_promise.process_registration_promise(id, confirmation_token);
                if (resp == 200)
                {
                    
                    service.shared.log("response:200 (aktivalva)");


                    var respon = new
                    {
                        status = "activated",
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
                        status = "wrong_token",
                        statuscode = "401"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    service.shared.log("response:401 (wrong_token)");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 409)
                {

                    var respon = new
                    {
                        status = "user_already_activated",
                        statuscode = "409"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);

                  
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);


                    data.Response.StatusCode = 409;
                  
                    service.shared.log("response:409 (user_already_activated)");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
                {

                    var respon = new
                    {
                        status = "user_not_found",
                        statuscode = "404"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);


                    service.shared.log(resp.ToString());
                    data.Response.StatusCode = 404;
                  
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                    service.shared.log("response:404 (user_not_found)");
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


                byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);


                service.shared.log($"Error 1: {ex.Message} -registration_promise.main");
                data.Response.StatusCode = 400;
               
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                service.shared.log("response:400 (malformed_request)");
            }
            finally
            {
                data.Response.OutputStream.Close();
            }
        }



































    }
}
