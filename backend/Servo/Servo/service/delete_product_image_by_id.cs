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
    internal class delete_product_image_by_id
    {

        public static int process_delete_product_image_by_id(string controller_admin_id, string controller_sesstoken, string product_id, string image_id)
        {


            string admin_accstate = model.shared.get_account_state_by_id(controller_admin_id);
            string model_sesstoken = model.shared.get_token_by_id(controller_admin_id);

            if (model_sesstoken == controller_sesstoken && (admin_accstate == "admin" || admin_accstate == "superadmin"))
            {
                // bejelentkeztetés oké


                try
                {
                    File.Delete(Path.Combine(Application.StartupPath, "public", "assets", "products", product_id, image_id + ".webp"));
                }
                catch
                {
                    service.shared.log($"Error deleting file: {Path.Combine(Application.StartupPath, "public", "images", "products", product_id, image_id)} --service.delete_product_image_by_id.process_delete_product_image_by_id");
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
