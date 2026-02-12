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
            "login", "registration_request", "registration_promise", "chpass_request", "chpass_promise", "get_all_products"
        };


        private static HttpListenerContext endconnection(HttpListenerContext data)
        {
            data.Response.OutputStream.Close();
            data.Response.Close();
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
                        byte[] buffer = Encoding.UTF8.GetBytes("hibas_token");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                        data = endconnection(data);

                        return;
                    }
                }




                    
                service.shared.log(">api kérés: " +lenyeg+"");
                // =========== GETTOKen =========== 

                if (lenyeg.Contains("login"))
                {
                    controller.login.main(data, lenyeg);
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

                    controller.login.main(data, lenyeg);

                   


                }

                else if (lenyeg.Contains("get_all_products"))
                {

                    controller.get_all_products.main(data, lenyeg);




                }


            }
            // =========== NEMAPI =========== 
            else
                {
                    service.shared.log(">nem api kérés: "+kert);
                    string hely = Path.Combine(alap, kert);

                    if (Directory.Exists(hely))
                        hely = Path.Combine(hely, "index.html");

                    if (File.Exists(hely))
                    {
                        try
                        {
                            byte[] fileBytes = File.ReadAllBytes(hely);
                            data.Response.ContentType = service.shared.mime(Path.GetExtension(hely));
                            data.Response.OutputStream.Write(fileBytes, 0, fileBytes.Length);
                        service.shared.log($"{data.Request.RemoteEndPoint.Address.ToString()} --> {hely.Split(new string[] { "\\public\\" }, StringSplitOptions.None)[1]} || ok");
                        Form1.Instance.updatefilesserved();
                        }
                        catch (Exception ex)
                        {
                            data.Response.StatusCode = 500;
                            byte[] buffer = Encoding.UTF8.GetBytes("server_error"); // köpönyegforgató módon elhallgatni a hibát és lejelenteni 3 sorral lejjebb
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                            Form1.Instance.updateerrorcount();
                        service.shared.log($"{data.Request.RemoteEndPoint.Address.ToString()} --> {hely.Split(new string[] { "\\public\\" }, StringSplitOptions.None)[1]} || ERROR: + {ex.Message}");
                        }
                    }
                    else
                    {


                        data.Response.StatusCode = 404;
                        byte[] buffer = Encoding.UTF8.GetBytes("file_not_found");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                        Form1.Instance.updateerrorcount();

                        Form1.Instance.log(data.Request.RemoteEndPoint.Address.ToString() + hely + " || ERROR: file not found");
                    }
                }

            data = endconnection(data);
        }

            

        
    }
}
