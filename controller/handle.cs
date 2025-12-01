using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Servo.controller
{
    internal class handle
    {
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



                // =========== NEMAPI =========== 
                else
                {

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
                            Form1.Instance.log(data.Request.RemoteEndPoint.Address.ToString() + hely + " || ok");
                            Form1.Instance.updatefilesserved();
                        }
                        catch (Exception ex)
                        {
                            data.Response.StatusCode = 500;
                            byte[] buffer = Encoding.UTF8.GetBytes("error"); // elhallgatni a hibát és alattomos módon lejelenteni 3 sorral lejjebb
                            data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                            Form1.Instance.updateerrorcount();
                            Form1.Instance.log(data.Request.RemoteEndPoint.Address.ToString() + hely + " || ERROR: " + ex.Message);
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

                data.Response.OutputStream.Close();
                data.Response.Close();

            }



        }
    }
}
