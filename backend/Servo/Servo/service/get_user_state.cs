using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class get_user_state
    {

        public static string process_get_user_state(string controller_user_id, string controller_sesstoken)
        {


            string accstate = model.shared.get_account_state_by_id(controller_user_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_user_id);


            


            if (model_sesstoken == controller_sesstoken)
            {
                // bejelentkeztetés oké



                return accstate;



            }

            else
            {

                return "error";

                // nem oké


            }



        }




    }
}
