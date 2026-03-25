using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class get_post
    {
        public static string process_get_post(string id, string admin, string admin_id, string admin_token)
        {

            //service.shared.log("Get all products change request: (" + ip+")"); 


            Dictionary<string, object> resp = new Dictionary<string, object>();

            string admin_accstate = model.shared.get_account_state_by_id(admin_id);
            string model_sesstoken = model.shared.get_token_by_id(admin_id);

            if (admin == "1" )
            {
                service.shared.log("admin", "api");
                if (model_sesstoken == admin_token) {

                    service.shared.log("token correct", "api");

                    if (admin_accstate == "admin" || admin_accstate == "superadmin"){

                        service.shared.log("admin yes", "api");

                        try
                        {
                            resp = model.get_post.communicate_get_post(id);
                        }
                        catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.get_post.process_get_post"); }



                    }
                    else { return "__error_permission_denied"; }
                       

                }
                else { return "__error_incorrect_credentials"; }
                   

            }

            else {

                if (model.shared.get_post_status_by_id(id) == "published")
                {
                    try
                    {
                        resp = model.get_post.communicate_get_post(id);
                    }
                    catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.get_post.process_get_post"); }

                }
                else
                {
                    return "__error_permission_denied";
                }

            }

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
                shared.log($"Debug 1: {resp["status"]} --service.get_post.process_get_post");
                return "error";
            }
            else
            {
                return JsonConvert.SerializeObject(resp);
                
            }


        }






        
    }
}
