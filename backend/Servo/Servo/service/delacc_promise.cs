using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.service
{
    internal class delacc_promise
    {

        public static int main(string controller_id, string controller_confirmation_token, string ip)
        {

            service.shared.log("Account deletion promise: " + controller_id + "   -> " + controller_confirmation_token + "  (" + ip);

            Dictionary<string, string> resp = new Dictionary<string, string> { };
            try
            {
                resp = model.shared.get_full_confirmation_by_identification(controller_id);
            }
            catch (Exception ex){ service.shared.log($"Error: {ex.Message} --service.delacc_promise.main 1"); }

            string recieved_token="";
            string expirationdate = "";
            try { 
             recieved_token = resp["confirmation_token"];
             expirationdate = resp["confirmation_token_expire"];
            }
            catch (Exception ex){ service.shared.log($"Error: {ex.Message} --service.delacc_promise.main 2"); }
            service.shared.log($"Debug: {expirationdate} || {controller_confirmation_token} --service.delacc_promise.main 2");

            string fetched_token = model.shared.get_token_by_id(controller_id);
            string model_password = model.shared.get_passhash_by_id(controller_id);
            string accstate = model.shared.get_account_state_by_id(controller_id);


            service.shared.log($"Debug: {fetched_token} || {model_password} || {accstate} || {resp["confirmation_type"]} --service.delacc_promise.main 3");

            DateTime expirationDate = DateTime.Parse(expirationdate);
            DateTime currentDate = DateTime.Now;


            if (resp["error"] == "true" && resp["confirmation_type"] != "account_deletion")
            {
                return 401;
            }
            else
            {
                if (currentDate > expirationDate)
                {
                    return 402;

                }
                else
                {

                    if (controller_confirmation_token == recieved_token)
                    {

                        model.delacc_promise.delete_account(controller_id);

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
