using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class get_all_orders
    {
        public static (int responsecode, string responsedata) process_get_all_orders(string controller_user_id, string controller_sesstoken)
        {



            Dictionary<string, object> resp = new Dictionary<string, object>();

            string model_sesstoken = model.shared.get_token_by_id(controller_user_id);


            service.shared.log("Get all order request: " + controller_user_id + "   -> " + controller_sesstoken);

            string accstate = model.shared.get_account_state_by_id(controller_user_id);

            service.shared.log($"Debug 1: {accstate} --service.get_all_orders.process_get_all_orders ");





            if (accstate == "admin")
            {


                if (model_sesstoken == controller_sesstoken)
                {



                    try
                    {
                        resp = model.get_all_orders.communicate_get_all_orders();
                    }
                    catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.get_all_orders.process_get_all_orders"); }






                    if (resp["statuscode"].ToString() == "500")
                    {
                        shared.log($"Debug 1: {resp["status"]} --service.get_all_orders.process_get_all_orders");
                        return (500, "internal error");
                    }
                    else
                    {



                        // if (van adat)
                        {

                            //calculate exchange rate
                            return (200, JsonConvert.SerializeObject(resp));
                        }



                        return (500, "internal error");


                    }









                }

                else
                {
                    return (401, "wrong_token"); ;
                }











            }

            else
            {
                return (401, "permission_denied"); ;
            }















































            //exchange rate




        }
    }
}
