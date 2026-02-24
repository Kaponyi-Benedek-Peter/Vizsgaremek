using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class update_password
    {

        public static int process_update_password(string controller_user_id, string controller_sesstoken, string new_passhash)
        {


            string accstate = model.shared.get_account_state_by_id(controller_user_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_user_id);

            if (model_sesstoken == controller_sesstoken && (accstate == "verified" || accstate == "admin"))
            {
                // bejelentkeztetés oké


                int result = model.shared.update_name_by_id(controller_user_id, new_firstname, new_lastname);

                if (result != 200)
                {

                    return 500;

                }

                return 200;
            }

            else
            {

                return 500;

                // nem oké


            }



        }




    }
}
