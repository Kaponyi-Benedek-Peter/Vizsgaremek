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
    internal class get_user_data
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');






            string user_id = "";
            string sesstoken = "";


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
                    user_id = service.shared.b64dec(jsonObj["id"].ToString());
                    sesstoken = service.shared.b64dec(jsonObj["session_token"].ToString());





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


                service.shared.log("Get user data request: " + user_id + "  " + sesstoken + "  (" + data.Request.RemoteEndPoint.Address.ToString());






                (object,string) resp = service.get_user_data.process_get_user_data(user_id, sesstoken); // SERVICE
                if (resp.Item2 == "200")
                {



                    data.Response.ContentType = "application/json";


                    var respon = resp.Item1;

                    string jsonrespon = JsonSerializer.Serialize(respon);




                    data.Response.StatusCode = 200;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                /*else if (resp == 401)
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
                }*/
                else if (resp.Item2 == "404")
                {

                    var respon = new
                    {
                        status = "inexistent_user",
                        statuscode = "404"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 404;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if(resp.Item2 == "401")
                {

                    var respon = new
                    {
                        status = "incorrect_credentials",
                        statuscode = "401"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 401;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else
                {

                    var respon = new
                    {
                        status = "internal_error",
                        statuscode = "500"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);

                    service.shared.log($"Error 2: {resp.Item1} / {resp.Item2} --controller.get_user_data.process_get_user_data");

                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.get_user_data.main");



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
                controller.router.safe_close(data);
            }
        }

    }
}
