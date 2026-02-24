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
    internal class delacc_promise
    {
        

        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');

            
            
            


            string id = "";
            string confirmation_token = "";

            try
            {
                
                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");

                
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
                    MessageBox.Show(jsonObj.ToString());
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;
                }



                int resp = 500;
                service.shared.log("Account deletion request: " + id + "  " + confirmation_token + "  (" + data.Request.RemoteEndPoint.Address.ToString());
                try
                {
                    resp = service.delacc_promise.process_delacc_promise(id, confirmation_token, data.Request.RemoteEndPoint.Address.ToString());
                }
                catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --controller.delacc_promise.main");}

                
                if (resp == 200)
                {

                    var respon = new
                    {
                        status = "user_deleted",
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
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else //if (resp == 500)
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

                service.shared.log($"Error 2: {ex.Message} --controller.delacc_promise.main");
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
