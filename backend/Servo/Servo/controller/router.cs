using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;


using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;



namespace Servo.controller
{
    internal class router
    {
        private static readonly HashSet<string> public_apis = new HashSet<string>
        {
            "login", "registration_request", "registration_promise", "chpass_request", "chpass_promise", "get_all_products", "newsletter_subscription", "get_all_featured_products", "get_all_product_categories"
        };


        private static HttpListenerContext endconnection(HttpListenerContext data)
        {
            try { 
            data.Response.OutputStream.Close();
            data.Response.Close();
            }
            catch (Exception ex)
            {
                service.shared.log("ERROR 1: can not close connection: " + ex.Message);
            }
            service.shared.log("[connection end]\n");
            return data;
        }
        public static void main(HttpListenerContext data, string alap)
        {
            //Form1.Instance.updateconnections();
            service.shared.log("[new connection]");
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');
            
            data.Response.AddHeader("Access-Control-Allow-Origin", "*");
            data.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            data.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");



            if (data.Request.HttpMethod == "OPTIONS")
            {
                data.Response.StatusCode = 200;
                data.Response.Close();
                return;
            }


            
            //api 
            if (kert.StartsWith("api/", StringComparison.OrdinalIgnoreCase))
            {
                string lenyeg = kert.Replace("api/", "");




                bool api_is_public = false;
                foreach (var endpoint in public_apis)
                {
                    if (lenyeg.Contains(endpoint))
                    {
                        api_is_public = true;
                        break;
                    }
                }


                if (!api_is_public)
                {
                    //kell jwt
                    string authorization_header = data.Request.Headers["Authorization"];
                    if(string.IsNullOrEmpty(authorization_header))
                    {
                        data.Response.StatusCode = 401;

                        var respon = new
                        {
                            status = "missing_auth_header",
                            statuscode = "401"
                        };

                        string jsonrespon = JsonSerializer.Serialize(respon);

                        byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        data= endconnection(data);

                        return;
                    }
                    else if (authorization_header.StartsWith("Bearer ") != true)
                    {
                        data.Response.StatusCode = 401;

                        var respon = new
                        {
                            status = "missing_auth_header",
                            statuscode = "401"
                        };

                        string jsonrespon = JsonSerializer.Serialize(respon);

                        byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        data = endconnection(data);

                        return;
                    }

                    string token = authorization_header.Substring(7);
                    var user = jwt_handler.validate_token(token);
                    if (user == null)
                    {
                        data.Response.StatusCode = 401;

                        var respon = new
                        {
                            status = "wrong_token",
                            statuscode = "401"
                        };

                        string jsonrespon = JsonSerializer.Serialize(respon);

                        byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        data = endconnection(data);

                        return;
                    }
                }




                    
                service.shared.log(">api kérés: " +lenyeg+"");
                // =========== GETTOKen =========== 

                if (lenyeg.Contains("login_request"))
                {
                    controller.login_request.main(data, lenyeg);
                }

                else if (lenyeg.Contains("login_promise"))
                {
                    controller.login_promise.main(data, lenyeg);



                }


                else if (lenyeg.Contains("chpass_request"))
                {
                    controller.chpass_request.main(data, lenyeg);

                    

                }

                else if (lenyeg.Contains("chpass_promise"))
                {

                    controller.chpass_promise.main(data, lenyeg);



                   

                }



                else if (lenyeg.Contains("registration_request"))
                {
                    //service.shared.log("[[[");
                    controller.registration_request.main(data, lenyeg);
                    //service.shared.log("]]]");


                }

                else if (lenyeg.Contains("registration_promise"))
                {
                    controller.registration_promise.main(data, lenyeg);
                    


                }



                else if (lenyeg.Contains("delacc_request"))
                {
                    controller.delacc_request.main(data, lenyeg);
                    

                }

                else if (lenyeg.Contains("delacc_promise"))
                {

                    controller.delacc_promise.main(data, lenyeg);
                    

                }



                else if (lenyeg.Contains("tesztapi1"))
                {

                    controller.login_request.main(data, lenyeg);

                   


                }

                else if (lenyeg.Contains("get_all_products"))
                {

                    controller.get_all_products.main(data, lenyeg);




                }
                else if (lenyeg.Contains("get_all_product_categories"))
                {

                    controller.get_all_product_categories.main(data, lenyeg);




                }

                else if (lenyeg.Contains("get_all_users"))
                {

                    controller.get_all_users.main(data, lenyeg);




                }
                else if (lenyeg.Contains("get_all_orders"))
                {

                    controller.get_all_orders.main(data, lenyeg);




                }
                else if (lenyeg.Contains("newsletter_subscription"))
                {

                    controller.newsletter_subscription.main(data, lenyeg);




                }
                else if (lenyeg.Contains("get_all_featured_products"))
                {

                    controller.get_all_featured_products.main(data, lenyeg);




                }
                else if (lenyeg.Contains("update_name"))
                {

                    controller.update_name_by_id.main(data, lenyeg);




                }
                else if (lenyeg.Contains("ban_user"))
                {

                    controller.ban_user.main(data, lenyeg);




                }
                else if (lenyeg.Contains("unban_user"))
                {

                    controller.unban_user.main(data, lenyeg);




                }
                else if (lenyeg.Contains("update_stock"))
                {

                    controller.update_stock.main(data, lenyeg);




                }



            }
            // =========== NEMAPI =========== 

            else
            {
                if (kert.StartsWith("static/", StringComparison.OrdinalIgnoreCase))
                {
                    kert = kert.Substring(7);
                }

                if (kert.EndsWith("/"))
                    kert = kert.TrimEnd('/');

                string hely = Path.Combine(alap, kert.Replace("/", Path.DirectorySeparatorChar.ToString()));
                service.shared.log("> requested file: " + kert + " -> " + hely);

                bool is_file = File.Exists(hely) && !Directory.Exists(hely);

                if (!is_file)
                {
                    // SPA halal
                    string static_path = Path.Combine(alap, "static", kert.Replace("/", Path.DirectorySeparatorChar.ToString()));
                    bool is_static = File.Exists(static_path);

                    if (is_static)
                    {
                        hely = static_path;
                        service.shared.log(">> static: " + static_path);
                    }
                    else
                    {
                        // !!! indeexxx
                        hely = Path.Combine(alap, "index.html");
                        service.shared.log(">> SPA: " + kert + " -> index.html");
                    }
                }

                try
                {
                    if (File.Exists(hely))
                    {
                        byte[] fileBytes = File.ReadAllBytes(hely);
                        data.Response.ContentType = service.shared.mime(Path.GetExtension(hely));
                        data.Response.OutputStream.Write(fileBytes, 0, fileBytes.Length);
                        service.shared.log(">> served: " + hely);
                    }
                    else
                    {
                        data.Response.StatusCode = 404;
                        byte[] buffer = Encoding.UTF8.GetBytes("File not found");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        service.shared.log("ERROR: File not found (" + hely + ")");
                    }
                }
                catch (Exception ex)
                {
                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes("Internal error");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    service.shared.log($"ERROR: {ex.Message}");
                }
            }












            data = endconnection(data);
        } // System.IndexOutOfRangeException: 'Az index a tömb határain kívülre mutatott.'




    }
}
