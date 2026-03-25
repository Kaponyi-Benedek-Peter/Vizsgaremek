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
