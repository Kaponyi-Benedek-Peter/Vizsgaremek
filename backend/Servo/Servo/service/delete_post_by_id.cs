using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class delete_post_by_id
    {

        public static int process_delete_post_by_id(string controller_admin_id, string controller_sesstoken, string post_id)
        {


            string admin_accstate = model.shared.get_account_state_by_id(controller_admin_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_admin_id);

            if (model_sesstoken == controller_sesstoken && (admin_accstate == "admin" || admin_accstate == "superadmin"))
            {
                // bejelentkeztetés oké


            
               
                    //do
                    int result = model.delete_post_by_id.communicate_delete_post_by_id(post_id);

                    if (result != 200)
                    {

                        return 500;

                    }

                    return 200;

               


            }

            else
            {


                if (!(admin_accstate == "admin" || admin_accstate == "superadmin"))
                {
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
