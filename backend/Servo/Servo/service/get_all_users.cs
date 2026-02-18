using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class get_all_users
    {
        public static string process_get_all_users()
        {


            Dictionary<string, object> resp = new Dictionary<string, object>();


            try
            {
                resp = model.get_all_users.communicate_get_all_users();
            }
            catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.get_all_users.process_get_all_users"); }


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
                shared.log($"Debug 1: {resp["status"]} --service.get_all_users.process_get_all_users");
                return "error";
            }
            else
            {



                // if (van adat)
                {

                    //calculate exchange rate
                    return JsonConvert.SerializeObject(resp);
                }



                return "error";


            }


        }
    }
}
