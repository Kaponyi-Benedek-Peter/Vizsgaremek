using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class update_stock
    {

        public static int process_update_stock(string controller_admin_id, string controller_sesstoken,string product_id, string new_stock_count)
        {


            string admin_accstate = model.shared.get_account_state_by_id(controller_admin_id);

            string model_sesstoken = model.shared.get_token_by_id(controller_sesstoken);

            if (model_sesstoken == controller_sesstoken && (admin_accstate == "admin" || admin_accstate == "superadmin"))
            {
                // bejelentkeztetés oké


                if (admin_accstate == "admin" || admin_accstate == "superadmin")
                {

                    //do
                    int result = model.shared.update_product_stock_by_id(product_id, new_stock_count);

                    if (result != 200)
                    {

                        return 500;

                    }

                    return 200;

                }

                return 403; // nincs jogosultság


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
