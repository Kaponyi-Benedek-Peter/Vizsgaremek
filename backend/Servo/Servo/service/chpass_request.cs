using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class chpass_request
    {
        private static string chpasshtml_top = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <title>Roy's Shack - Login Email</title>\r\n  <style>\r\n    body {\r\n      font-family: Arial, sans-serif;\r\n      margin: 0;\r\n      padding: 0;\r\n      background-color: #F5F0E1;\r\n      color: #333;\r\n      animation: fadeIn 1.2s ease;\r\n    }\r\n\r\n    .header {\r\n      background-color: #067A45;\r\n      color: white;\r\n      text-align: center;\r\n      padding: 40px 20px;\r\n      box-shadow: 0 4px 10px rgba(0,0,0,0.25);\r\n    }\r\n\r\n    .header img {\r\n      width: 70px;\r\n      height: 70px;\r\n      border-radius: 50%;\r\n      border: 3px solid #fff;\r\n      margin-bottom: 10px;\r\n    }\r\n\r\n    .header h1 {\r\n      margin: 0;\r\n      font-size: 28px;\r\n      letter-spacing: 1px;\r\n    }\r\n\r\n    .content {\r\n      padding: 50px 20px;\r\n      text-align: center;\r\n    }\r\n\r\n    .content h2 {\r\n      margin-top: 0;\r\n      font-size: 24px;\r\n      color: #067A45;\r\n    }\r\n\r\n    .content p {\r\n      font-size: 16px;\r\n      line-height: 1.6;\r\n      margin: 20px auto;\r\n      max-width: 600px;\r\n    }\r\n\r\n    .button {\r\n      display: inline-block;\r\n      background-color: #067A45;\r\n      color: #fff;\r\n      text-decoration: none;\r\n      padding: 16px 32px;\r\n      border-radius: 10px;\r\n      font-weight: bold;\r\n      font-size: 16px;\r\n      border: 3px solid #067A45;\r\n      transition: all 0.3s ease;\r\n      box-shadow: 0 4px 8px rgba(0,0,0,0.25);\r\n      margin-top: 20px;\r\n    }\r\n\r\n    .button:hover {\r\n      background-color: #fff;\r\n      color: #067A45;\r\n      transform: scale(1.05);\r\n    }\r\n\r\n    .footer {\r\n      background-color: #fff;\r\n      text-align: center;\r\n      font-size: 13px;\r\n      color: #555;\r\n      padding: 20px;\r\n      border-top: 3px solid #067A45;\r\n      box-shadow: 0 -3px 8px rgba(0,0,0,0.1);\r\n    }\r\n\r\n    @keyframes fadeIn {\r\n      from { opacity: 0; transform: translateY(15px); }\r\n      to { opacity: 1; transform: translateY(0); }\r\n    }\r\n\r\n    html{background-color: white;}\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"header\">\r\n    <img src=\"localhost:90/a.gif\" alt=\"Logo\">\r\n    <h1>Roy's Shack</h1>\r\n  </div>\r\n\r\n  <div class=\"content\">\r\n    <h2>Welcome Back!</h2>\r\n    <p>\r\n      Hello there,<br>\r\n      We received a request to log in to your Roy's Shack account.<br>\r\n      Click the button below to securely sign in:\r\n    </p>\r\n\r\n    <a href=\"";
        private static string chpasshtml_bottom = "\" class=\"button\">Log In</a>\r\n\r\n    <p>If you didn’t request this login, you can safely ignore this email.</p>\r\n  </div>\r\n\r\n  <div class=\"footer\">\r\n    © 2025 Roy's Shack. All rights reserved.<br>\r\n    This is an automated message, please do not reply.\r\n  </div>\r\n</body>\r\n</html>\r\n";
        public static void sendchpass(string email, string id, string newpasshash)
        {
            string confirmation_token = service.shared.gen_code(false);

            
            int result = model.shared.add_confirmation(confirmation_token,id,newpasshash,"password_change");     

            service.shared.send_mail(email, "Password Change", chpasshtml_top + $"{service.shared.current_url}?chpass=" + service.shared.b64enc(id) + ";" + service.shared.b64enc(confirmation_token) + chpasshtml_bottom, "chpass");

            //testpanel.Instance.textBox2.Text = session_token; // csak tesztelés miatt

        }











        public static int main(string controller_id,string controller_jelszo_uj,string ip)
        {
            try
            {
                string fetched_token = model.shared.get_token_by_id(controller_id);

                string jelszo_uj = service.shared.Decrypt(fetched_token, controller_jelszo_uj);

                service.shared.log("Password change request: " + controller_id + "   -> " + controller_jelszo_uj + "  (" + ip);


                string model_password = model.shared.get_passhash_by_id(controller_id);
                string accstate = model.shared.get_account_state_by_id(controller_id);
                service.shared.log(",, " + accstate + " ,,");
                if (accstate == "verified")
                {
                    string controller_email = model.shared.get_email_by_id(controller_id);
                    //  sendchpass(controller_email,controller_id, service.shared.hashpass(controller_jelszo_uj));
                    //
                    model.shared.add_confirmation(service.shared.gen_code(false), controller_id, controller_jelszo_uj, "password_change");
                    return 200;
                }

                else
                {

                    return 500;


                    // nem oké


                }

            }
            catch (Exception e) { service.shared.log(e.Message);return 1500; }

        }




    }
}
