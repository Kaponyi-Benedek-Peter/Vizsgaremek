using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static Mysqlx.Datatypes.Scalar.Types;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class registration_promise
    {



        public static int main(string controller_id,string controller_token)
        {
            try
            {
                string controller_email = model.shared.get_email_by_id(controller_id);
                string accstate = model.shared.get_account_state_by_id(controller_id);
                string model_recieved_token = model.shared.get_token_by_id(controller_id);
                service.shared.log(model_recieved_token);
                service.shared.log(accstate+" 43t34t353453453453454");
                if (accstate == "unverified" || string.IsNullOrEmpty(accstate) && model_recieved_token == controller_token)
                {
                    var test=model.registration_promise.main(controller_id);
                    //MessageBox.Show(test.ToString());
                    service.shared.log(test.ToString());
                    if (test == 200)
                    {
                        service.shared.log(accstate + " 43t34tbbb");
                        return 200;
                        
                    }
                    else { return 500; }
                }

                else
                {
                   
                    if (controller_token != model_recieved_token)
                    {

                        return 401;
                    }

                    else
                    {
                        service.shared.log(accstate + " 43t34ttttt");
                        return 500;
                    }
                    // nem oké


                }

            }
            catch (Exception ex) { service.shared.log(ex.Message + " -service.registration_promise.main");return 500; }

        }





    }
}
