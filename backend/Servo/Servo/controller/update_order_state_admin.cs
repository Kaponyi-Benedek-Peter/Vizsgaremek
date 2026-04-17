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
    internal class update_order_status_admin
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');






            string admin_id = "";
            string sesstoken = "";
            string target_ordert_id = "";
            string new_order_status = "";


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
                    admin_id = service.shared.b64dec(jsonObj["admin_id"].ToString());
                    sesstoken = service.shared.b64dec(jsonObj["admin_session_token"].ToString());
                    target_ordert_id = service.shared.b64dec(jsonObj["target_ordert_id"].ToString());
                    new_order_status = service.shared.b64dec(jsonObj["new_order_status"].ToString());

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


                service.shared.log("Update order status request: " + admin_id + " : " + target_ordert_id + " > " + new_order_status + "  (" + data.Request.RemoteEndPoint.Address.ToString());






                int resp = service.update_order_status_admin.process_update_order_status_admin(admin_id, sesstoken, target_ordert_id, new_order_status); // SERVICE
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

               
                else if (resp == 403)
                {



                    data.Response.ContentType = "application/json";

                    var respon = new
                    {
                        status = "permission_denied",
                        statuscode = "403"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 403;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
                else if (resp == 401)
                {



                    data.Response.ContentType = "application/json";

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
                        status = "internal_error",
                        statuscode = "500"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon);


                    data.Response.StatusCode = 403;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --controller.update_order_status_admin.main");



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
