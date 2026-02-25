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
    internal class update_name_by_id
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');






            string user_id = "";
            string sesstoken = "";
            string new_firstname = "";
            string new_lastname = "";


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
                    sesstoken = service.shared.b64dec(jsonObj["sesstoken"].ToString());
                    new_firstname = service.shared.b64dec(jsonObj["new_firstname"].ToString());
                    new_lastname = service.shared.b64dec(jsonObj["new_lastname"].ToString());





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


                service.shared.log("Name update token request: " + user_id + "  " + sesstoken + "  (" + data.Request.RemoteEndPoint.Address.ToString());






                int resp = service.update_name_by_id.process_update_name_by_id(user_id,sesstoken,new_firstname,new_lastname); // SERVICE
                if (resp == 200)
                {



                    data.Response.ContentType = "application/json";


                    var respon = new
                    {
                        /*session_token = model.shared.get_token_by_id(model.shared.get_id_by_email(email)),
                        jwttoken = token,
                        expires_in = 604800, // 7 nap  */
                        status = "success",
                        statuscode = "200"
                    };

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
                else //if (resp == 500)
                {

                    var respon = new
                    {
                        status = "inexistent_user_or_incorrect_data",
                        statuscode = "403"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 403;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.update_name_by_id.main");



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
