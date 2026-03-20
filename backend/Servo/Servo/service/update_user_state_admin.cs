using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class update_user_state_admin
    {

        public static int process_update_user_state_admin(string controller_admin_id, string controller_sesstoken, string controller_target_user_id, string new_user_state, string reason)
        {


            string admin_accstate = model.shared.get_account_state_by_id(controller_admin_id);
            string target_accstate = model.shared.get_account_state_by_id(controller_target_user_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_admin_id);

            if (model_sesstoken == controller_sesstoken && (admin_accstate == "admin"||admin_accstate=="superadmin"))
            {
                // bejelentkeztetés oké


                if (controller_target_user_id == controller_admin_id)
                {
                    // nem lehet magát módosítani
                    return 422;
                }
                else if ((admin_accstate=="admin"||admin_accstate=="superadmin")) {

                    //do
                    int result1 = model.shared.update_account_state_by_id(controller_target_user_id, new_user_state);

                    int result2 = 0;
                    if (new_user_state == "banned")
                    {
                        result2 = model.shared.update_ban_reason_by_id(controller_target_user_id, reason);
                    }


                    if (result1 != 200 && result2==0 || result1!=200 && result1==200 )
                    {

                        return 500;

                    }

                    return 200;

                }
                else
                {
                    return 403; // nem létezik
                }


            }

            else
            {


               
                    return 401; // nincs bejelentkezve
             



            }



        }




    }
}
