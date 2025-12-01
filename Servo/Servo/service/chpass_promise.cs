using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class chpass_promise
    {
        public static int main(string controller_id, string controller_confirmation_token, string ip)
        {
            
            service.shared.log("Password change request: " + controller_id + "   -> " + controller_confirmation_token + "  (" + ip);



            Dictionary<string, string> resp = new Dictionary<string, string>();


            try
            {
                resp = model.shared.get_full_confirmation_by_identification(controller_id);
            }
            catch (Exception ex) { service.shared.log(ex.Message+ " -service.chpass_promise.main 0"); }

            string recieved_token=""; 
            string expirationdate="";
            string new_passhash="";

            try
            {

             recieved_token = resp["confirmation_token"];
             expirationdate = resp["confirmation_token_expire"];
             new_passhash = resp["new_value"];

            }
            catch (Exception ex) { service.shared.log(ex.Message+ " -service.chpass_promise.main 1"); }


            string fetched_token = model.shared.get_token_by_id(controller_id);
            string model_password = model.shared.get_sesstoken_expiration_by_id(controller_id);
            string accstate = model.shared.get_account_state_by_id(controller_id);

            service.shared.log(controller_confirmation_token);
            service.shared.log(fetched_token);



            DateTime expirationDate = DateTime.Parse(expirationdate);
            DateTime currentDate = DateTime.Now;

            if (resp["error"] == "true" && resp["type"] != "password_change")
            {
                return 401;
            }
            else { 
                if (currentDate > expirationDate)
                {
                    return 402;

                }
                else
                {

                    if (controller_confirmation_token == recieved_token)
                    {

                        model.chpass_promise.change_password(controller_id, new_passhash);
                        model.chpass_promise.delete_confirmation(controller_id);
                        return 200;
                    }
                    else
                    {

                        return 401;
                    }


                return 500;

                }
            }


        }
    }
}
