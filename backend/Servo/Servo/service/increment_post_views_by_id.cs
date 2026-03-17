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
    internal class increment_post_views_by_id
    {

        public static int process_increment_post_views_by_id(string controller_user_id, string controller_session_token, string controller_post_id)
        {

            string model_session_token = model.shared.get_token_by_id(controller_user_id);
            string accstate = model.shared.get_account_state_by_id(controller_user_id);
            if (model_session_token == controller_session_token && (accstate == "verified" || accstate == "admin" || accstate == "superadmin"))
            {
                // bejelentkeztetés oké





                try
                {
                    Boolean is_a_number = int.TryParse(controller_post_id, out _);
                    if (is_a_number) { model.shared.increment_post_views_by_id(controller_post_id); }
                    else
                    {
                        return 400; // rossz post id
                    }

                }
                catch (Exception ex)
                {
                    
                    return 500;
                }


                /*  int result = model.shared.add_confirmation(con);

                  if (result != 200)
                  {

                      return 500;

                  }






                  sendlogin(email, model_user_id, new_confirmation_token, language);

                  */

                return 200;
            }

            else
            {

                
                if (controller_session_token != model_session_token)
                {

                    return 401; // hibas token
                }
                else
                {
                    return 403; // hianyzo permission
                }

                


            }



        }

        
       




    }
}
