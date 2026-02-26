using Org.BouncyCastle.Math.EC;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Servo.service
{
    internal class delacc_request
    {

        private static string accdeletionhtml_top = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <title>Roy's Shack - Login Email</title>\r\n  <style>\r\n    body {\r\n      font-family: Arial, sans-serif;\r\n      margin: 0;\r\n      padding: 0;\r\n      background-color: #F5F0E1;\r\n      color: #333;\r\n      animation: fadeIn 1.2s ease;\r\n    }\r\n\r\n    .header {\r\n      background-color: #067A45;\r\n      color: white;\r\n      text-align: center;\r\n      padding: 40px 20px;\r\n      box-shadow: 0 4px 10px rgba(0,0,0,0.25);\r\n    }\r\n\r\n    .header img {\r\n      width: 70px;\r\n      height: 70px;\r\n      border-radius: 50%;\r\n      border: 3px solid #fff;\r\n      margin-bottom: 10px;\r\n    }\r\n\r\n    .header h1 {\r\n      margin: 0;\r\n      font-size: 28px;\r\n      letter-spacing: 1px;\r\n    }\r\n\r\n    .content {\r\n      padding: 50px 20px;\r\n      text-align: center;\r\n    }\r\n\r\n    .content h2 {\r\n      margin-top: 0;\r\n      font-size: 24px;\r\n      color: #067A45;\r\n    }\r\n\r\n    .content p {\r\n      font-size: 16px;\r\n      line-height: 1.6;\r\n      margin: 20px auto;\r\n      max-width: 600px;\r\n    }\r\n\r\n    .button {\r\n      display: inline-block;\r\n      background-color: #067A45;\r\n      color: #fff;\r\n      text-decoration: none;\r\n      padding: 16px 32px;\r\n      border-radius: 10px;\r\n      font-weight: bold;\r\n      font-size: 16px;\r\n      border: 3px solid #067A45;\r\n      transition: all 0.3s ease;\r\n      box-shadow: 0 4px 8px rgba(0,0,0,0.25);\r\n      margin-top: 20px;\r\n    }\r\n\r\n    .button:hover {\r\n      background-color: #fff;\r\n      color: #067A45;\r\n      transform: scale(1.05);\r\n    }\r\n\r\n    .footer {\r\n      background-color: #fff;\r\n      text-align: center;\r\n      font-size: 13px;\r\n      color: #555;\r\n      padding: 20px;\r\n      border-top: 3px solid #067A45;\r\n      box-shadow: 0 -3px 8px rgba(0,0,0,0.1);\r\n    }\r\n\r\n    @keyframes fadeIn {\r\n      from { opacity: 0; transform: translateY(15px); }\r\n      to { opacity: 1; transform: translateY(0); }\r\n    }\r\n\r\n    html{background-color: white;}\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"header\">\r\n    <img src=\"www.roysshack.hu/media/logo.webp\" alt=\"Logo\">\r\n    <h1>Roy's Shack</h1>\r\n  </div>\r\n\r\n  <div class=\"content\">\r\n    <h2>Welcome Back!</h2>\r\n    <p>\r\n      Hello there,<br>\r\n      We received a request to log in to your Roy's Shack account.<br>\r\n      Click the button below to securely sign in:\r\n    </p>\r\n\r\n    <a href=\"";
        private static string accdeletionhtml_bottom = "\" class=\"button\">Log In</a>\r\n\r\n    <p>If you didn’t request this login, you can safely ignore this email.</p>\r\n  </div>\r\n\r\n  <div class=\"footer\">\r\n    © 2025 Roy's Shack. All rights reserved.<br>\r\n    This is an automated message, please do not reply.\r\n  </div>\r\n</body>\r\n</html>\r\n";

        public static void sendaccdeletion(string email,string token,string language)
        {
            string id = model.shared.get_id_by_email(email);
            (string firstname, string lastname) name = model.shared.get_name_by_id(id);



            string emailhtml = File.ReadAllText($"templates/password_reset_{language.ToUpper()}.html"
            )    .Replace("{FIRST_NAME}", name.firstname)
                .Replace("{LAST_NAME}", name.lastname)
                .Replace("{CONFIRM_DELETE_URL}", $"{service.shared.current_url}?accdel=" + service.shared.b64enc(email) + ";" + service.shared.b64enc(token))
            ;


            service.shared.send_mail(email, "Account deletion", emailhtml, "accdeletion");


            //testpanel.Instance.textBox2.Text = session_token; // csak tesztelés miatt

        }



        public static int process_delacc_request(string controller_id, string controller_jelszo,string language, string ip)
        {
            try
            {
                service.shared.log($"Debug 1: X --service.delacc_request.process_delacc_request");
                string fetched_token = "";
                try
                {
                    fetched_token = model.shared.get_token_by_id(controller_id);
                }
                catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.delacc_request.process_delacc_request"); }

                string jelszo_uj = "";

                service.shared.log($"Debug 2: {fetched_token} || {controller_jelszo} --service.delacc_request.process_delacc_request");
                try
                {
                    jelszo_uj = service.shared.hashpass(controller_jelszo);
                }
                catch (Exception ex) { service.shared.log($"Error 2: {ex.Message} --service.delacc_request.process_delacc_request"); }

                string model_password = "";
                string accstate = "";
                try
                {
                    model_password = model.shared.get_passhash_by_id(controller_id);
                    accstate = model.shared.get_account_state_by_id(controller_id);
                }
                catch (Exception ex) { service.shared.log($"Error 3: {ex.Message} --service.delacc_request.process_delacc_request);"); }

                try
                {
                    if (accstate == "verified" || accstate == "admin")
                    {
                        string controller_email = "";
                        try
                        {
                            controller_email = model.shared.get_email_by_id(controller_id);
                        }

                        catch (Exception ex) { service.shared.log($"Error 4: {ex.Message} --service.delacc_request.process_delacc_request"); }

                        service.shared.log($"Debug 3: {model_password} || {jelszo_uj} --service.delacc_request.process_delacc_request");
                        if (model_password == jelszo_uj)
                        {
                            string confirmation_token = service.shared.gen_code(false);
                            sendaccdeletion(controller_email,confirmation_token,language);
                            try
                            {

                                model.shared.confirmation con = new model.shared.confirmation
                                {
                                    confirmation_token = confirmation_token,
                                    value = "-",
                                    confirmation_type = "account_deletion",
                                    user_id = controller_id,


                                };

                                int result = model.shared.add_confirmation(con);
                            }
                            catch (Exception ex) { service.shared.log($"Error 5: {ex.Message} --service.delacc_request.process_delacc_request"); }

                            service.shared.log($"Debug 4: \"szendelte\" --service.delacc_request.process_delacc_request");
                            return 200;
                        }
                        else
                        {
                            service.shared.log($"Debug 5: \"rosszjelszo\" --service.delacc_request.process_delacc_request");
                            return 401;
                        }



                        return 200;
                    }
                    else if (accstate == "banned")
                    {
                        service.shared.log($"Debug 7: \"banned\" --service.delacc_request.process_delacc_request");
                        return 401;
                    }
                    else
                    {
                        service.shared.log($"Debug 8: \"500\" --service.delacc_request.process_delacc_request");
                        return 500;
                    }
                }
                catch (Exception ex) { service.shared.log($"Error 6: {ex.Message} --service.delacc_request.process_delacc_request"); }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 7: {ex.Message} --service.delacc_request.process_delacc_request");
            }
            return 500;
        }










    }
}
