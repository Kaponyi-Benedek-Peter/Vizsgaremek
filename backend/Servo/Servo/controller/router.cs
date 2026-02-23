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
                        byte[] buffer = Encoding.UTF8.GetBytes("hianyzo_auth_header");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        data= endconnection(data);

                        return;
                    }
                    else if (authorization_header.StartsWith("Bearer ") != true)
                    {
                        data.Response.StatusCode = 401;
                        byte[] buffer = Encoding.UTF8.GetBytes("hianyzo_auth_header");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        data = endconnection(data);

                        return;
                    }

                    string token = authorization_header.Substring(7);
                    var user = jwt_handler.validate_token(token);
                    if (user == null)
                    {
                        data.Response.StatusCode = 401;
                        byte[] buffer = Encoding.UTF8.GetBytes("wrong_token");
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



            }
            // =========== NEMAPI =========== 

            else 
            {
                if (kert.StartsWith("static/", StringComparison.OrdinalIgnoreCase))
                {
                    kert = kert.Substring(7); 
                }

                
                
                

              

                string hely = Path.Combine(alap, kert.Replace("/", Path.DirectorySeparatorChar.ToString()));

            //    service.shared.log("> Served path: " + hely);


                bool isPhysicalFile = File.Exists(hely) && !Directory.Exists(hely);

                if (!isPhysicalFile)
                {
                   
                    string extension = Path.GetExtension(hely);

                    if (string.IsNullOrEmpty(extension))
                    {
                        hely = Path.Combine(alap, "index.html");
                        service.shared.log(">> SPA Navigation Route!");
                    }
                    else
                    {
                        data.Response.StatusCode = 404;
                        byte[] buffer = Encoding.UTF8.GetBytes("Asset not found");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        service.shared.log("ERROR 2: asset not found (" + hely + ") --controller.router.main");
                    }
                }

                try
                {
                    if (File.Exists(hely))
                    {
                        byte[] fileBytes = File.ReadAllBytes(hely);
                        data.Response.ContentType = service.shared.mime(Path.GetExtension(hely));
                        data.Response.OutputStream.Write(fileBytes, 0, fileBytes.Length);

                        //Form1.Instance.updatefilesserved();
         //               service.shared.log($"{data.Request.RemoteEndPoint.Address} --> {kert} || OK");
                    }
                    else
                    {
                        
                        data.Response.StatusCode = 404;
                        byte[] buffer = Encoding.UTF8.GetBytes("Internal error");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        service.shared.log("ERROR 3: index.html not found (" + hely+") --controller.router.main");
                    }
                }
                catch (Exception ex)
                {
                    data.Response.StatusCode = 500;
                    byte[] buffer = Encoding.UTF8.GetBytes("Internal error");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                   // Form1.Instance.updateerrorcount();
                   service.shared.log($"ERROR 4: {ex.Message} --controller.router.main");
                }



            }



            






            data = endconnection(data);
        } // System.IndexOutOfRangeException: 'Az index a tömb határain kívülre mutatott.'




    }
}
