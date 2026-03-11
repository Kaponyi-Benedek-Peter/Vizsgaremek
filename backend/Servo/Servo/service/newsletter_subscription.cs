using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class newsletter_subscription
    {

        public static int process_newsletter_subscription(string news_level, string email,string language)
        {

           
            
            


                



                model.shared.newsletter_recipient recip = new model.shared.newsletter_recipient
                {
                    email = email,
                    news_level = news_level,
                    language = language,



                };



                int result = model.shared.add_newsletter_recipient(recip);

                sendwelcome(email, language);
                return result;










                return 200;
          

        }

        private static string loginhtml_top = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <title>Roy's Shack - Welcome</title>\r\n  <style>\r\n    body {\r\n      font-family: Arial, sans-serif;\r\n      margin: 0;\r\n      padding: 0;\r\n      background-color: #F5F0E1;\r\n      color: #333;\r\n      animation: fadeIn 1.2s ease;\r\n    }\r\n\r\n    .header {\r\n      background-color: #067A45;\r\n      color: white;\r\n      text-align: center;\r\n      padding: 40px 20px;\r\n      box-shadow: 0 4px 10px rgba(0,0,0,0.25);\r\n    }\r\n\r\n    .header img {\r\n      width: 70px;\r\n      height: 70px;\r\n      border-radius: 50%;\r\n      border: 3px solid #fff;\r\n      margin-bottom: 10px;\r\n    }\r\n\r\n    .header h1 {\r\n      margin: 0;\r\n      font-size: 28px;\r\n      letter-spacing: 1px;\r\n    }\r\n\r\n    .content {\r\n      padding: 50px 20px;\r\n      text-align: center;\r\n    }\r\n\r\n    .content h2 {\r\n      margin-top: 0;\r\n      font-size: 24px;\r\n      color: #067A45;\r\n    }\r\n\r\n    .content p {\r\n      font-size: 16px;\r\n      line-height: 1.6;\r\n      margin: 20px auto;\r\n      max-width: 600px;\r\n    }\r\n\r\n    .button {\r\n      display: inline-block;\r\n      background-color: #067A45;\r\n      color: #fff;\r\n      text-decoration: none;\r\n      padding: 16px 32px;\r\n      border-radius: 10px;\r\n      font-weight: bold;\r\n      font-size: 16px;\r\n      border: 3px solid #067A45;\r\n      transition: all 0.3s ease;\r\n      box-shadow: 0 4px 8px rgba(0,0,0,0.25);\r\n      margin-top: 20px;\r\n    }\r\n\r\n    .button:hover {\r\n      background-color: #fff;\r\n      color: #067A45;\r\n      transform: scale(1.05);\r\n    }\r\n\r\n    .footer {\r\n      background-color: #fff;\r\n      text-align: center;\r\n      font-size: 13px;\r\n      color: #555;\r\n      padding: 20px;\r\n      border-top: 3px solid #067A45;\r\n      box-shadow: 0 -3px 8px rgba(0,0,0,0.1);\r\n    }\r\n\r\n    @keyframes fadeIn {\r\n      from { opacity: 0; transform: translateY(15px); }\r\n      to { opacity: 1; transform: translateY(0); }\r\n    }\r\n\r\n    html{background-color: white;}\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"header\">\r\n    <img src=\"www.roysshack.hu/media/logo.webp\" alt=\"Logo\">\r\n    <h1>Roy's Shack</h1>\r\n  </div>\r\n\r\n  <div class=\"content\">\r\n    <h2>Welcome aboard!</h2>\r\n    <p>\r\n      Hello there,<br>\r\n      We received a newsletter subscription request.<br>\r\n      If you believe this was a mistake, click this button here:\r\n    </p>\r\n\r\n    <a href=\"";
        private static string loginhtml_bottom = "\" class=\"button\">Unsubscribe</a>\r\n\r\n    \r\n  </div>\r\n\r\n  <div class=\"footer\">\r\n    © 2025 Roy's Shack. All rights reserved.<br>\r\n    This is an automated message, please do not reply.\r\n  </div>\r\n</body>\r\n</html>\r\n";

        public static void sendwelcome(string hova,string language)
        {


            //string first_name = model.shared.get_firstname_by_newsletter_email();

            string emailhtml = File.ReadAllText($"templates/password_reset_{language.ToUpper()}.html"
                .Replace("{EMAIL}", hova)

           //     .Replace("{FIRST_NAME}", first_name)

            )    .Replace("{UNSUBSCRIBE_URL}", $"{service.shared.current_url}?unsubscribe=" + service.shared.b64enc(hova))
            ;



            service.shared.send_mail(hova, "Welcome to Roy's Shack!",emailhtml , "newsletter subscription");







        }




    }
}
