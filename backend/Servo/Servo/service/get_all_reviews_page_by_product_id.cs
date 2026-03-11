using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class get_all_reviews_page_by_product_id
    {
        public static string process_get_all_reviews_page_by_product_id(string page, string amount, string product_id)
        {

            //service.shared.log("Get all products change request: (" + ip+")"); 


            Dictionary<string, object> resp = new Dictionary<string, object>();

            
            try
            {
                resp = model.get_all_reviews_page_by_product_id.communicate_get_all_reviews_page_by_product_id(page,amount,product_id);
            }
            catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.get_all_reviews_page_by_product_id.process_get_all_reviews_page_by_product_id"); }


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
                shared.log($"Debug 1: {resp["status"]} --service.get_all_reviews_page_by_product_id.process_get_all_reviews_page_by_product_id");
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
