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
                resp = model.shared.get_full_confirmation_by_user_id(controller_id,"account_deletion");
            }
            catch (Exception ex){ service.shared.log($"Error 1: {ex.Message} --service.delacc_promise.process_delacc_promise"); }

            string recieved_token="";
            string expirationdate = "";
            try { 
             recieved_token = resp["confirmation_token"];
             expirationdate = resp["confirmation_token_expire"];
            }
            catch (Exception ex){ service.shared.log($"Error 2: {ex.Message} --service.delacc_promise.process_delacc_promise"); }
            service.shared.log($"Debug 2: {expirationdate} || {controller_confirmation_token} --service.delacc_promise.process_delacc_promise");

            string fetched_token = model.shared.get_token_by_id(controller_id);
            string model_password = model.shared.get_passhash_by_id(controller_id);
            string accstate = model.shared.get_account_state_by_id(controller_id);


            service.shared.log($"Debug 3: {fetched_token} || {model_password} || {accstate} || {resp["confirmation_type"]} --service.delacc_promise.process_delacc_promise");

            DateTime expirationDate = DateTime.Parse(expirationdate);
            DateTime currentDate = DateTime.Now;


            if (resp["error"] == "true" && resp["confirmation_type"] != "account_deletion")
            {
                service.shared.log($"Debug 4:  401 || {resp["error"]} || {resp["confirmation_type"]} || --service.delacc_promise.process_delacc_promise");
                return 401;
                

            }
            else
            {
                if (currentDate > expirationDate)
                {
                    service.shared.log($"Debug 5:  402 --service.delacc_promise.process_delacc_promise");
                    return 402;

                }
                else
                {

                    if (controller_confirmation_token == recieved_token)
                    {

                        model.delacc_promise.communicate_delete_account(controller_id);
                        service.shared.log($"Debug 6:  200 --service.delacc_promise.process_delacc_promise");
                        return 200;
                    }
                    else
                    {
                        service.shared.log($"Debug 7:  401 || {controller_confirmation_token} || {recieved_token} --service.delacc_promise.process_delacc_promise");

                        return 401;
                    }

                    service.shared.log($"Debug 8:  500 --service.delacc_promise.process_delacc_promise");
                    return 500;

                }
            }





        }
    }
}
