using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace Servo.controller
{
    internal class get_all_products
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');







            try
            {

                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");

                


                service.shared.log("Get all products request: (" + data.Request.RemoteEndPoint.Address.ToString()+")");



                
                //string json = $"{{\"token\":\"{token}\",\"expires_in\":604800}}"; // 7 nap





                string resp = service.get_all_products.process_get_all_products(); // SERVICE
                if (resp != "error")
                {
                    data.Response.StatusCode = 200;
                    data.Response.ContentType = "application/json";
                    byte[] buffer = Encoding.UTF8.GetBytes(resp);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                
                else //if (resp == 500)
                {

                    var respon = new
                    {
                        status = "unknown_error",
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
                service.shared.log($"Error 1: {ex.Message} --controller.login.main");


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
