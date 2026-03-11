using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class get_all_posts_admin
    {
        public static (int, string) process_get_all_posts_admin(string controller_sesstoken, string user_id, string category)
        {

            //service.shared.log("Get all products change request: (" + ip+")"); 



            service.shared.log("2");







            string model_sesstoken = model.shared.get_token_by_id(user_id);
            string admin_accstate = model.shared.get_account_state_by_id(user_id);


            if (model_sesstoken == controller_sesstoken && (admin_accstate == "admin" || admin_accstate == "superadmin"))
            {
                // bejelentkeztetés oké


                    Dictionary<string, object> resp = new Dictionary<string, object>();


                    try
                    {
                    service.shared.log("3");
                    resp = model.get_all_posts_admin.communicate_get_all_posts_admin(category);
                    }
                    catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.get_all_posts_admin.process_get_all_posts_admin"); }


                    /*try
                    {

                        recieved_token = resp["confirmation_token"];
                        expirationdate = resp["confirmation_token_expire"];
                        new_passhash = resp["new_value"];

                    }
                    catch (Exception ex) { service.shared.log($"Error: {ex.Message} --service.chpass_promise.process_chpass_promise 2"); }
                    */



                    //service.shared.log(controller_confirmation_token);
                    //service.shared.log(fetched_token);



                    //exchange rate

                    if (resp["statuscode"].ToString() == "500")
                    {
                        shared.log($"Debug 1: {resp["status"]} --service.get_all_posts_admin.process_get_all_posts_admin");
                        return (500, "internal_error");
                    }
                    else
                    {



                        // if (van adat)
                        {

                            //calculate exchange rate
                            return (200, JsonConvert.SerializeObject(resp));
                        }



                        return (500, "internal_error");


                    }

            }

            else
            {


                if (!(admin_accstate == "admin" || admin_accstate == "superadmin"))
                {
                    return (403, "permission_denied"); // nincs jogosultság
                }
                else
                {
                    return (401, "auth_error"); // nincs bejelentkezve
                }


                // nem oké


            }































            


        }
    }
}
