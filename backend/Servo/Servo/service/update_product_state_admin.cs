using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class update_user_proudct_admin
    {

        public static int process_update_proudct_state_admin(string controller_admin_id, string controller_sesstoken, string controller_target_proudct_id, string new_proudct_state)
        {


            string admin_accstate = model.shared.get_account_state_by_id(controller_admin_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_admin_id);

            if (model_sesstoken == controller_sesstoken)
            {

                if ((admin_accstate == "admin" || admin_accstate == "superadmin"))
                {



                    // bejelentkeztetés oké



                    /*
                        //do
                        int result1 = model.shared.update_account_state_by_id(controller_target_user_id, new_user_state);

                        int result2 = 0;
                        if (new_user_state == "banned")
                        {
                            result2 = model.shared.update_ban_reason_by_id(controller_target_user_id, reason);
                        }


                        if (result1 != 200 && result2 == 0 || result1 != 200 && result1 == 200)
                        {

                            return 500;

                        }

                        return 200;

                    */
                    return 200;



                }
                else
                {
                    return 403; // permission denied
                }



            }

            else
            {



                return 401; // nincs bejelentkezve




            }



        }




    }
}
