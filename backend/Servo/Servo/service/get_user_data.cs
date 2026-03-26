using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class get_user_data
    {

        public static (object,string) process_get_user_data(string controller_user_id, string controller_sesstoken)
        {


            string accstate = model.shared.get_account_state_by_id(controller_user_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_user_id);



            if (accstate == "404")
            {
                return ("", "404");
                
            }
            
            if (model_sesstoken == controller_sesstoken)
            {
                // bejelentkeztetés oké

                (object,string) to_return;
                try
                {
                   to_return= (model.get_user_data.communicate_get_user_data(controller_user_id), "200");
                }
                catch (Exception ex)
                {
                    to_return = ("","500");
                    service.shared.log($"Error 4: {ex.Message} --get_user_data.process_get_user_data");
                }
                return to_return;



            }

            else
            {

                return ("","401");

                // nem oké


            }



        }




    }
}
