using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace Servo.controller
{
    internal class get_all_users
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');




            string user_id = "";
            string session_token = "";


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
                    session_token = service.shared.b64dec(jsonObj["session_token"].ToString());
                }
                catch
                {
                    service.shared.log($"Debug 1: hibas input --controller.get_all_users");

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
              
               





                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");




                service.shared.log("Get all users request: (" + data.Request.RemoteEndPoint.Address.ToString() + ")");




                //string json = $"{{\"token\":\"{token}\",\"expires_in\":604800}}"; // 7 nap





                (int responsecode, string responsedata) resp = service.get_all_users.process_get_all_users(user_id,session_token); // SERVICE

                service.shared.log($"Debug 1: controller.get_all_users.main -- response code: {resp.responsecode}");

                if (resp.responsecode ==200)
                {
                    data.Response.StatusCode = 200;

                    data.Response.ContentType = "application/json";
                    byte[] buffer = Encoding.UTF8.GetBytes(resp.responsedata);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp.responsecode == 401)
                {

                    var respon = new
                    {
                        status = resp.responsedata,
                        statuscode = 401
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
                        status = resp.responsedata,
                        statuscode = resp.responsecode
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = resp.responsecode;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.get_all_users.main");


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
