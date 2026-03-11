using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class ban_user
    {

        public static int process_ban_user(string controller_admin_id, string controller_sesstoken, string controller_target_user_id)
        {


            string admin_accstate = model.shared.get_account_state_by_id(controller_admin_id);
            string target_accstate = model.shared.get_account_state_by_id(controller_target_user_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_sesstoken);

            if (model_sesstoken == controller_sesstoken && (admin_accstate == "admin"||admin_accstate=="superadmin"))
            {
                // bejelentkeztetés oké


                if (controller_target_user_id == controller_admin_id)
                {
                    // nem lehet magát kitiltani
                    return 422;
                }
                else if (target_accstate == "banned" && (admin_accstate=="admin"&&admin_accstate=="superadmin")) {

                    //do
                    int result = model.shared.update_account_state_by_id(controller_target_user_id, "verified");

                    if (result != 200)
                    {

                        return 500;

                    }

                    return 200;

                }
                else
                {
                    return 409; // már kitiltva vagyn em létezik
                }


            }

            else
            {


                if (!(admin_accstate == "admin" || admin_accstate == "superadmin")) {
                    return 403; // nincs jogosultság
                }
                else
                {
                    return 401; // nincs bejelentkezve
                }


                    return 500;

                // nem oké


            }



        }




    }
}
