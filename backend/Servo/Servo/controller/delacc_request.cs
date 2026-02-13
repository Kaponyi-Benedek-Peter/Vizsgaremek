using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Servo.controller
{
    internal class delacc_request
    {


















        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');

            
            
            

          
            string id = "";
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
                id = service.shared.b64dec(jsonObj["id"].ToString());
                jelszo = service.shared.b64dec(jsonObj["password"].ToString());
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

                int resp = 0;
                service.shared.log("Debug 1: Account deletion request: " + id + "  " + jelszo + "  (" + data.Request.RemoteEndPoint.Address.ToString());
                try
                {
                    service.shared.log("Debug 2: controller.delacc_request.main");
                    resp = service.delacc_request.process_delacc_request(id, jelszo, data.Request.RemoteEndPoint.Address.ToString());
                    service.shared.log("Debug 3: controller.delacc_request.main");
                }
                catch (Exception ex)
                {
                    service.shared.log($"Error 1: {ex.Message} -controller.delacc_request.main");
                }

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
                        status = "wrong_password",
                        statuscode = "401"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else //if (resp == 500)
                {

                    var respon = new
                    {
                        status = "server_error_or_inexistent_user",
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
                service.shared.log($"Error 2: {ex.Message} --controller.delacc_request.main");
                data.Response.StatusCode = 500;
                byte[] buffer = Encoding.UTF8.GetBytes("server_error_or_inexistent_user");
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            finally
            {
                data.Response.OutputStream.Close();
            }
        }






























    }
}
