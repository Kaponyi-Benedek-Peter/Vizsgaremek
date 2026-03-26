using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using ZstdSharp.Unsafe;




namespace Servo.controller
{
    internal class router
    {
        private static readonly HashSet<string> public_apis = new HashSet<string>
        {
            "login", "registration_request", "registration_promise", "chpass_request", "chpass_promise", "get_all_products", "newsletter_subscription", "get_all_featured_products", "get_all_product_categories", "get_all_reviews_page_by_product_id", "get_all_posts", "get_post_by_id", "get_product_by_id","get_user_state","get_all_product_images_by_id","increment_post_views_by_id","create_product","create_post","update_post_by_id","create_post_comment","delete_all_post_comments_by_post_id","delete_post_comment_by_comment_id","update_post_comment_by_comment_id","get_all_orders_admin","create_order","update_user_state_admin","get_all_product","update_stock_admin","get_post_by_id","upload_product_image_admin","delete_product_image_admin","get_all_orders_user","get_user_data","delete_product_by_id_admin"
        };


        public static ConcurrentDictionary<string, byte[]> _fileCache = new ConcurrentDictionary<string, byte[]> ();


        //public static Dictionary<string, int> connectioncounts = new Dictionary<string, int>();
        
        
        //public static List<string> honeypot_ips = new List<string>();


        public static ConcurrentDictionary<string, int> connectioncounts = new ConcurrentDictionary<string, int> { };
        public static ConcurrentDictionary<string, int> connectioncounts_static = new ConcurrentDictionary<string, int> { };


        public static ConcurrentBag<string> honeypot_ips = new ConcurrentBag<string> { };



        public static string safe_close(HttpListenerContext data)
        {
            try
            {
                data.Response.OutputStream.Close();
                return "ok";
            }
            catch (Exception ex)
            {
                service.shared.log("ERROR 1: can not close connection: " + ex.Message + " --controller.router");
                return "error";
            }

        }

        static Form1 f1 = Form1.Instance;
        private static HttpListenerContext endconnection(HttpListenerContext data)
        {
            try { 
            controller.router.safe_close(data);
            data.Response.Close();
            }
            catch (Exception ex)
            {
                service.shared.log("ERROR 1: can not close connection: " + ex.Message);
            }
            service.shared.log("[✖️]"); // connection_end
            return data;
        }
        public static async void main(HttpListenerContext data, string alap)
        {





            string host = data.Request.Url.Host;
            if (data.Request.HttpMethod == "OPTIONS")
            {
                data.Response.AddHeader("Access-Control-Allow-Origin", "*");
                data.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                data.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
                data.Response.StatusCode = 200;
                data.Response.Close();
                return;
            }

            if (host == "roysshack.hu")
            {
                data.Response.AddHeader("Access-Control-Allow-Origin", "*");
                data.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                data.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
                string redirectUrl = "https://www.roysshack.hu" + data.Request.Url.PathAndQuery;
                data.Response.StatusCode = 301;
                data.Response.AddHeader("Location", redirectUrl);
                data.Response.Close();
                return;
            }


            /*if(honeypot_ips.Contains(data.Request.RemoteEndPoint.Address.ToString()))
            {
                //data.Response.StatusCode = 403;
                //byte[] buffer = Encoding.UTF8.GetBytes("Forbidden");
                //data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                //data = endconnection(data);
                data.Response.Abort();
                service.shared.log($"[honeypot hit blocked] IP: {data.Request.RemoteEndPoint.Address.ToString()}");
                return;
            }*/
            // ha van cloudflare tunnell akkor ezt nem !!



            //Form1.Instance.updateconnections();
            service.shared.log("[➕]"); // new connection
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');
            
            data.Response.AddHeader("Access-Control-Allow-Origin", "*");
            data.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            data.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

            data.Response.AddHeader("X-Frame-Options", "SAMEORIGIN");

            data.Response.AddHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
            data.Response.AddHeader("Cross-Origin-Resource-Policy", "cross-origin"); //  same-origin
            data.Response.AddHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
            data.Response.AddHeader("Cross-Origin-Opener-Policy", "unsafe-none");
            data.Response.AddHeader("Content-Security-Policy",
                "default-src 'self'; " +
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data: https:; " +
                "font-src 'self' data: https:; " +
                "connect-src 'self' https:; " +
                "frame-ancestors 'none'; " +
                "object-src 'none';" +
                "base-uri 'self';"
            );



            if (data.Request.HttpMethod == "OPTIONS")
            {
                data.Response.StatusCode = 200;
                data.Response.Close();
                return;
            }


            string ip = data.Request.RemoteEndPoint.Address.ToString();


            connectioncounts_static.TryGetValue(ip, out int count);
            count++;
            connectioncounts_static[ip] = count;



            /*
             *  ddos vedelem itt
             * 
            
            
            connectioncounts.TryGetValue(ip, out int count);
            count++;
            connectioncounts[ip] = count;






            if (false) // count > 350
            {
                data.Response.StatusCode = 429;
                data.Response.ContentType = "text/html";
                string html = "<head><link rel='icon' href='data:,'><style>*{color:white;background-color:#212121}</style></head><body>Too many requests</body>";
                byte[] buffer = Encoding.UTF8.GetBytes(html);
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                data = endconnection(data);
                f1.updatesusconns();
                return;
            }
               */




            f1.updateconnections();

            //api 
            if (kert.StartsWith("api/", StringComparison.OrdinalIgnoreCase))
            {
                string lenyeg = kert.Replace("api/", "");

                f1.updateapisserved();



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


                 if (lenyeg.Contains("delete_post_comment_by_post_id_admin"))
                {

                     controller.delete_all_post_comments_by_post_id.main(data, lenyeg);

                }
                else if (lenyeg.Contains("get_all_orders_admin"))
                {

                    controller.get_all_orders.main(data, lenyeg);




                }
                else if (lenyeg.Contains("upload_product_image_admin"))
                {

                    controller.upload_product_image_admin.main(data, lenyeg);

                }
                else if (lenyeg.Contains("get_all_orders_user"))
                {

                    controller.get_all_orders_user.main(data, lenyeg);

                }

                else if (lenyeg.Contains("delete_product_image_admin"))
                {

                    controller.delete_image_by_id.main(data, lenyeg);

                }

                else if (lenyeg.Contains("delete_product_by_id_admin"))
                {

                    controller.delete_product_by_id.main(data, lenyeg);

                }


                else if (lenyeg.Contains("update_post_comment_by_comment_id"))
                {

                    controller.update_post_comment_by_comment_id.main(data, lenyeg);

                }
                else if (lenyeg.Contains("login_request"))
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
                else if (lenyeg.Contains("get_all_product_image"))
                {

                    controller.get_all_product_images.main(data, lenyeg);

                }
                else if (lenyeg.Contains("get_all_products"))
                {

                    controller.get_all_products.main(data, lenyeg);




                }
                else if (lenyeg.Contains("get_all_product_categories"))
                {

                    controller.get_all_product_categories.main(data, lenyeg);




                }

                else if (lenyeg.Contains("get_all_users_admin"))
                {

                    controller.get_all_users.main(data, lenyeg);




                }
                else if (lenyeg.Contains("get_user_data"))
                {

                    controller.get_user_data.main(data, lenyeg);




                }

                else if (lenyeg.Contains("newsletter_subscription"))
                {

                    controller.newsletter_subscription.main(data, lenyeg);




                }
                else if (lenyeg.Contains("get_all_featured_products"))
                {

                    controller.get_all_featured_products.main(data, lenyeg);




                }
                else if (lenyeg.Contains("update_name_by_id"))
                {

                    controller.update_name_by_id.main(data, lenyeg);




                }
                else if (lenyeg.Contains("ban_user_admin"))
                {

                    controller.update_user_state_admin.main(data, lenyeg);




                }
                else if (lenyeg.Contains("unban_user_admin"))
                {

                    controller.unban_user.main(data, lenyeg);




                }
                else if (lenyeg.Contains("update_stock_admin"))
                {

                    controller.update_stock.main(data, lenyeg);




                }

                else if (lenyeg.Contains("get_all_reviews_page_by_product_id"))
                {

                    controller.get_all_reviews_page_by_product_id.main(data, lenyeg);




                }
                else if (lenyeg.Contains("get_all_posts_admin"))
                {

                    controller.get_all_posts_admin.main(data, lenyeg);


                    service.shared.log("1");

                }
                else if (lenyeg.Contains("get_all_posts"))
                {

                    controller.get_all_posts.main(data, lenyeg);




                }
                else if (lenyeg.Contains("get_post_by_id"))
                {

                    controller.get_post.main(data, lenyeg);

                }
                else if (lenyeg.Contains("get_product_by_id"))
                {

                    controller.get_product_by_id.main(data, lenyeg);

                }

                else if (lenyeg.Contains("delete_post_by_id_admin"))
                {

                    controller.delete_post_by_id.main(data, lenyeg);

                }
                else if (lenyeg.Contains("delete_all_posts_admin"))
                {

                    controller.delete_all_posts.main(data, lenyeg);

                }
                else if (lenyeg.Contains("get_user_state"))
                {

                    controller.get_user_state.main(data, lenyeg);

                }

                else if (lenyeg.Contains("get_all_product_images_by_id"))
                {

                    controller.get_all_product_images_by_id.main(data, lenyeg);

                }
                //

                else if (lenyeg.Contains("increment_post_views_by_id"))
                {

                    controller.increment_post_views_by_id.main(data, lenyeg);

                }


                else if (lenyeg.Contains("create_product_admin"))
                {

                    controller.create_product.main(data, lenyeg);

                }
                else if (lenyeg.Contains("create_post_comment"))
                {

                    controller.create_post_comment_by_post_id.main(data, lenyeg);

                }
                else if (lenyeg.Contains("create_post_admin"))
                {

                    controller.create_post.main(data, lenyeg);

                }
                else if (lenyeg.Contains("update_post_by_id_admin"))
                {

                    controller.update_post_by_id.main(data, lenyeg);

                }



                else if (lenyeg.Contains("delete_all_post_comments_by_post_id_admin"))
                {

                    controller.delete_all_post_comments_by_post_id.main(data, lenyeg);

                }
                else if (lenyeg.Contains("delete_post_comment_by_comment_id"))
                {

                    controller.delete_post_comment_by_comment_id.main(data, lenyeg);

                }
                else if (lenyeg.Contains("create_order"))
                {

                    controller.create_order.main(data, lenyeg);

                }
                else if (lenyeg.Contains("get_all_post_categories"))
                {

                    controller.get_all_post_categories.main(data, lenyeg);

                }
                else if (lenyeg.Contains("update_user_state_admin"))
                {

                    controller.update_user_state_admin.main(data, lenyeg);

                }
               

                //







            }
            // =========== NEMAPI =========== 

            else
            {

                f1.updatefilesserved();
                if (kert.StartsWith("static/", StringComparison.OrdinalIgnoreCase))
                {
                    kert = kert.Substring(7);
                }

                if (kert.EndsWith("/"))
                    kert = kert.TrimEnd('/');

                string hely = Path.Combine(alap, kert.Replace("/", Path.DirectorySeparatorChar.ToString()));
                service.shared.log("> requested file: " + kert + " -> " + hely,"static");

                bool is_file = File.Exists(hely) && !Directory.Exists(hely);

                if (!is_file)
                {
                    // SPA halal
                    string static_path = Path.Combine(alap, "static", kert.Replace("/", Path.DirectorySeparatorChar.ToString()));
                    bool is_static = File.Exists(static_path);

                    if (is_static)
                    {
                        hely = static_path;
                        service.shared.log(">> static: " + static_path, "static");
                    }
                    else
                    {
                        string ext = Path.GetExtension(kert);
                        if (string.IsNullOrEmpty(ext))
                        {
                            // indeeeeeex.html
                            hely = Path.Combine(alap, "index.html");
                            service.shared.log(">> SPA: " + kert + " -> index.html", "static");
                        }
                        else
                        {
                            // nem letezik
                            data.Response.StatusCode = 404;
                            byte[] buffer = Encoding.UTF8.GetBytes("File not found");
                            data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                            service.shared.log("ERROR: File not found (" + kert + ")", "static");
                            data = endconnection(data);
                            return;
                        }
                    }
                }

                try
                {
                    if (File.Exists(hely))
                    {
                        (string, Boolean) mime_response = service.shared.mime(Path.GetExtension(hely));

                        byte[] buffer;
                        if (mime_response.Item2)
                        {
                            
                            buffer = _fileCache.GetOrAdd(hely, path =>
                            {
                                byte[] raw = File.ReadAllBytes(path);
                                using (var ms = new MemoryStream())
                                {
                                    using (var gz = new GZipStream(ms, CompressionLevel.Optimal))
                                        gz.Write(raw, 0, raw.Length);
                                    return ms.ToArray();
                                }
                            });
                        }
                        else
                        {
                            byte[] raw = File.ReadAllBytes(hely);
                            using (var ms = new MemoryStream())
                            {
                                using (var gz = new GZipStream(ms, CompressionLevel.Optimal))
                                    gz.Write(raw, 0, raw.Length);
                                buffer = ms.ToArray();
                            }
                        }

                        data.Response.ContentType = mime_response.Item1;
                        if (mime_response.Item2)
                        {
                            data.Response.AddHeader("Cache-Control", "public, max-age=31536000, immutable");
                        }
                        else
                        {
                            data.Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
                        }
                        data.Response.StatusCode = 200;
                        data.Response.AddHeader("Content-Encoding", "gzip");
                        data.Response.ContentLength64 = buffer.Length;
                        service.shared.log(">> served: " + hely, "static");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        f1.updatebandwidth(buffer.Length);
                        data = endconnection(data);
                        f1.updatesusconns();
                        return;
                    }
                    else
                    {
                        data.Response.StatusCode = 404;
                        byte[] buffer = Encoding.UTF8.GetBytes("File not found");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        service.shared.log("ERROR: File not found (" + hely + ")", "static");
                    }
                }
                catch (Exception ex)
                {
                    try
                    {
                        data.Response.StatusCode = 500;
                        byte[] buffer = Encoding.UTF8.GetBytes("Internal error");
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        service.shared.log($"ERROR: {ex.Message}");
                    }
                    catch (Exception ex2)
                    {
                        service.shared.log($"ERROR 2: {ex2.Message} --controller.router");
                    }
                }
            }












            data = endconnection(data);
        } // System.IndexOutOfRangeException: 'Az index a tömb határain kívülre mutatott.'




    }
}
