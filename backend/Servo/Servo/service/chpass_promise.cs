using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class chpass_promise
    {
        public static (int responsecode, string responsedata) process_chpass_promise(string controller_id, string controller_confirmation_token, string ip)
        {
            
            service.shared.log("Password change request: " + controller_id + "   -> " + controller_confirmation_token + "  (" + ip);

            controller_confirmation_token = service.shared.b64dec(controller_confirmation_token);

            Dictionary<string, string> resp = new Dictionary<string, string>();


            try
            {
                resp = model.shared.get_full_confirmation_by_user_id(controller_id,"password_change");
            }
            catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.chpass_promise.process_chpass_promise"); }

            string recieved_token=""; 
            string expirationdate="";
            string new_passhash="";

            try
            {

             recieved_token = resp["confirmation_token"];
             expirationdate = resp["confirmation_token_expire"];
             new_passhash = resp["new_value"];

            }
            catch (Exception ex) { service.shared.log($"Error 2: {ex.Message} --service.chpass_promise.process_chpass_promise"); }


            string fetched_token = model.shared.get_token_by_id(controller_id);
            string model_password = model.shared.get_sesstoken_expiration_by_id(controller_id);
            string accstate = model.shared.get_account_state_by_id(controller_id);

            //service.shared.log(controller_confirmation_token);
            //service.shared.log(fetched_token);



            DateTime expirationDate = DateTime.Parse(expirationdate);
            DateTime currentDate = DateTime.Now;

            if (resp["error"] == "true" && resp["type"] != "password_change")
            {
                shared.log($"Debug 1: {resp["type"]} --service.chpass_promise.process_chpass_promise");
                return (401,"error");
            }
            else { 
                if (currentDate > expirationDate)
                {
                    return (410, "error");

                }
                else
                {

                    if (controller_confirmation_token == recieved_token)
                    {

                        model.chpass_promise.change_password(controller_id, new_passhash);
                        model.chpass_promise.delete_confirmation(controller_id);
                        string model_email = model.shared.get_email_by_id(controller_id);


                        string new_sesstoken = service.shared.gen_code(false);

                        string model_session_token = model.shared.refresh_token(controller_id,new_sesstoken);

                        if (model_session_token != "404")
                        {
                            var respon = new
                            {
                                jwt_token = jwt_handler.generate_token(model_email),
                                session_token = new_sesstoken,
                                status = "success",
                                statuscode = "200"
                            };

                            string jsonrespon = JsonSerializer.Serialize(respon);


                            return (200, "error");
                        }
                        else
                        {
                            return (500, "error");
                        }

                        
                    }
                    else
                    {
                        shared.log($"Debug 1: {controller_confirmation_token} > {recieved_token} --service.chpass_promise.process_chpass_promise X");
                        return (401, "error");

                    }


                return (500, "error");

                }
            }


        }
    }
}
