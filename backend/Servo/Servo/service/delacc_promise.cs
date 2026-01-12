using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.service
{
    internal class delacc_promise
    {

        public static int process_delacc_promise(string controller_id, string controller_confirmation_token, string ip)
        {

            service.shared.log("Account deletion promise: " + controller_id + "   -> " + controller_confirmation_token + "  (" + ip);

            Dictionary<string, string> resp = new Dictionary<string, string> { };
            try
            {
                resp = model.shared.get_full_confirmation_by_identification(controller_id,"account_deletion");
            }
            catch (Exception ex){ service.shared.log($"Error: {ex.Message} --service.delacc_promise.process_delacc_promise 1"); }

            string recieved_token="";
            string expirationdate = "";
            try { 
             recieved_token = resp["confirmation_token"];
             expirationdate = resp["confirmation_token_expire"];
            }
            catch (Exception ex){ service.shared.log($"Error: {ex.Message} --service.delacc_promise.process_delacc_promise 2"); }
            service.shared.log($"Debug: {expirationdate} || {controller_confirmation_token} --service.delacc_promise.process_delacc_promise 2");

            string fetched_token = model.shared.get_token_by_id(controller_id);
            string model_password = model.shared.get_passhash_by_id(controller_id);
            string accstate = model.shared.get_account_state_by_id(controller_id);


            service.shared.log($"Debug: {fetched_token} || {model_password} || {accstate} || {resp["confirmation_type"]} --service.delacc_promise.process_delacc_promise 3");

            DateTime expirationDate = DateTime.Parse(expirationdate);
            DateTime currentDate = DateTime.Now;


            if (resp["error"] == "true" && resp["confirmation_type"] != "account_deletion")
            {
                service.shared.log($"Debug:  401 || {resp["error"]} || {resp["confirmation_type"]} || --service.delacc_promise.process_delacc_promise 4");
                return 401;
                

            }
            else
            {
                if (currentDate > expirationDate)
                {
                    service.shared.log($"Debug:  402 --service.delacc_promise.process_delacc_promise 5");
                    return 402;

                }
                else
                {

                    if (controller_confirmation_token == recieved_token)
                    {

                        model.delacc_promise.communicate_delete_account(controller_id);
                        service.shared.log($"Debug:  200 --service.delacc_promise.process_delacc_promise 5");
                        return 200;
                    }
                    else
                    {
                        service.shared.log($"Debug:  401 || {controller_confirmation_token} || {recieved_token} --service.delacc_promise.process_delacc_promise 6");

                        return 401;
                    }

                    service.shared.log($"Debug:  500 --service.delacc_promise.process_delacc_promise 7");
                    return 500;

                }
            }





        }
    }
}
