using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class login_promise
    {

        public static (int responsecode, string responsedata) process_login_promise(string controller_id, string controller_confirmation_token)
        {



            shared.log($"Debug 0: {controller_id} --service.login_promise.process_login_promise");



            Dictionary<string, string> resp = new Dictionary<string, string>();


            try
            {
                resp = model.shared.get_full_confirmation_by_user_id(controller_id, "login");
            }
            catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.login_promise.process_login_promise"); }

            string recieved_token = "";
            string expirationdate = "";
            string new_value = "";



           
            if (!resp.ContainsKey("confirmation_token") ||
                !resp.ContainsKey("confirmation_token_expire") ||
                !resp.ContainsKey("new_value"))
            {
                service.shared.log($"Error 2: Missing confirmation data for user {controller_id}");
                return (401, "error");
            }


            try
            {

                recieved_token = resp["confirmation_token"];
                expirationdate = resp["confirmation_token_expire"];
                new_value = resp["new_value"];

            }
            catch (Exception ex) { service.shared.log($"Error 2: {ex.Message} --service.login_promise.process_login_promise"); }


            string fetched_token = model.shared.get_token_by_id(controller_id);
            string sesstoken_expiration = model.shared.get_sesstoken_expiration_by_id(controller_id);
            string accstate = model.shared.get_account_state_by_id(controller_id);

            //service.shared.log(controller_confirmation_token);
            //service.shared.log(fetched_token);



            if (!DateTime.TryParse(expirationdate, out DateTime expirationDate))
            {
                service.shared.log($"Error 3: {expirationdate} --service.login_promise.process_login_promise");
                return (410, "error");
            }
            DateTime currentDate = DateTime.Now;

            if (resp["error"] == "true" && resp["type"] != "login")
            {
                shared.log($"Debug 1: {resp["type"]} --service.login_promise.process_login_promise");
                return (401, "error");
            }
            else
            {
                if (currentDate > expirationDate)
                {
                    return (410, "error");

                }
                else
                {

                    if (controller_confirmation_token == recieved_token)
                    {

                        
                        //return confirmation data


                        string model_email = model.shared.get_email_by_id(controller_id);


                        string new_sesstoken = service.shared.gen_code(false);
                        model.shared.refresh_token(controller_id, new_sesstoken);
                        string model_session_token = model.shared.get_token_by_id(controller_id);

                        shared.log($"Debug 1.5: {model_session_token} --service.login_promise.process_login_promise");

                        string expiration = model.shared.get_sesstoken_expiration_by_id(controller_id);
                        string new_jwt_token = jwt_handler.generate_token(model_email);
                        string jwt_expiration = jwt_handler.generate_expiration_string();



                        if (model_session_token != "404")
                        {
                            var respon = new
                            {
                                jwt_token = new_jwt_token,
                                jwt_token_expiration = jwt_expiration,
                                user_id = controller_id,

                                session_token = new_sesstoken,
                                session_token_expiration = expiration,
                                status = "success",
                                statuscode = "200"
                            };

                            string jsonrespon = JsonSerializer.Serialize(respon);

                            model.shared.delete_confirmations_by_user_id_and_type(controller_id, "login");


                            return (200, jsonrespon);
                        }
                        else
                        {
                            shared.log($"Debug 1: {model_session_token} --service.login_promise.process_login_promise X");

                            return (500, "error");
                        }


                    }
                    else
                    {
                        shared.log($"Debug 2: {controller_confirmation_token} > {recieved_token} --service.login_promise.process_login_promise X");
                        return (401, "error");

                    }


                    return (500, "error");

                }
            }


        }




    }
}
