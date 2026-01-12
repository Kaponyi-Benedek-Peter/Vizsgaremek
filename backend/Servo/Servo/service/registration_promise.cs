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



        public static int process_registration_promise(string controller_id,string controller_token)
        {
            try
            {
                string controller_email = model.shared.get_email_by_id(controller_id);
                string accstate = model.shared.get_account_state_by_id(controller_id);
                string model_recieved_token = model.shared.get_token_by_id(controller_id);

                MessageBox.Show(model_recieved_token + "<<");
                MessageBox.Show(controller_token+"<<");

                service.shared.log($"Debug: {model_recieved_token} || {accstate} --service.registration_promise.process_registration_promise 1");
                
                if ((accstate == "unverified" || string.IsNullOrEmpty(accstate)) && model_recieved_token == controller_token)
                {
                    var test=model.registration_promise.main(controller_id);
                    //MessageBox.Show(test.ToString());

                    service.shared.log($"Debug: {test.ToString()} --service.registration_promise.process_registration_promise 2");


                    if (test == 200)
                    {

                        service.shared.log($"Debug: {accstate} --service.registration_promise.process_registration_promise 3");

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
                    else if (accstate == "verified")
                    {
                        service.shared.log($"Debug: {accstate} --service.registration_promise.process_registration_promise 4");
                        return 409;
                    }

                    else
                    {
                        service.shared.log($"Debug: {accstate} --service.registration_promise.process_registration_promise 4");
                        return 500;
                    }
                    // nem oké


                }

            }
            catch (Exception ex) { service.shared.log($"Error: {ex.Message} --service.registration_promise.process_registration_promise 1");return 404; }

        }





    }
}
