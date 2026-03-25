using Org.BouncyCastle.Math.EC;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Servo.service
{
    internal class delacc_request
    {

        
        public static void sendaccdeletion(string email,string token,string language)
        {
            string id = model.shared.get_id_by_email(email);
            (string firstname, string lastname) name = model.shared.get_name_by_id(id);



            string emailhtml = File.ReadAllText($"templates/password_reset_{language.ToUpper()}.html"
            )    .Replace("{FIRST_NAME}", name.firstname)
                .Replace("{LAST_NAME}", name.lastname)
                .Replace("{CONFIRM_DELETE_URL}", $"{service.shared.current_url}?accdel=" + service.shared.b64enc(email) + ";" + service.shared.b64enc(token))
            ;


            service.shared.send_mail(email, "Account deletion", emailhtml, "accdeletion");


            //testpanel.Instance.textBox2.Text = session_token; // csak tesztelés miatt

        }



        public static int process_delacc_request(string controller_id, string controller_jelszo,string language, string ip)
        {
            try
            {
                service.shared.log($"Debug 1: X --service.delacc_request.process_delacc_request");
                string fetched_token = "";
                try
                {
                    fetched_token = model.shared.get_token_by_id(controller_id);
                }
                catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.delacc_request.process_delacc_request"); }

                string jelszo_uj = "";

                service.shared.log($"Debug 2: {fetched_token} || {controller_jelszo} --service.delacc_request.process_delacc_request");
                try
                {
                    jelszo_uj = service.shared.hashpass(controller_jelszo);
                }
                catch (Exception ex) { service.shared.log($"Error 2: {ex.Message} --service.delacc_request.process_delacc_request"); }

                string model_password = "";
                string accstate = "";
                try
                {
                    model_password = model.shared.get_passhash_by_id(controller_id);
                    accstate = model.shared.get_account_state_by_id(controller_id);
                }
                catch (Exception ex) { service.shared.log($"Error 3: {ex.Message} --service.delacc_request.process_delacc_request);"); }

                try
                {
                    if (accstate == "verified" || accstate == "admin" || accstate == "superadmin")
                    {
                        string controller_email = "";
                        try
                        {
                            controller_email = model.shared.get_email_by_id(controller_id);
                        }

                        catch (Exception ex) { service.shared.log($"Error 4: {ex.Message} --service.delacc_request.process_delacc_request"); }

                        service.shared.log($"Debug 3: {model_password} || {jelszo_uj} --service.delacc_request.process_delacc_request");
                        if (model_password == jelszo_uj)
                        {
                            string confirmation_token = service.shared.gen_code(false);
                            sendaccdeletion(controller_email,confirmation_token,language);
                            try
                            {

                                model.shared.confirmation con = new model.shared.confirmation
                                {
                                    confirmation_token = confirmation_token,
                                    value = "-",
                                    confirmation_type = "account_deletion",
                                    user_id = controller_id,


                                };

                                int result = model.shared.add_confirmation(con);
                            }
                            catch (Exception ex) { service.shared.log($"Error 5: {ex.Message} --service.delacc_request.process_delacc_request"); }

                            service.shared.log($"Debug 4: \"szendelte\" --service.delacc_request.process_delacc_request");
                            return 200;
                        }
                        else
                        {
                            service.shared.log($"Debug 5: \"rosszjelszo\" --service.delacc_request.process_delacc_request");
                            return 401;
                        }



                        return 200;
                    }
                    else if (accstate == "banned")
                    {
                        service.shared.log($"Debug 7: \"banned\" --service.delacc_request.process_delacc_request");
                        return 401;
                    }
                    else
                    {
                        service.shared.log($"Debug 8: \"500\" --service.delacc_request.process_delacc_request");
                        return 500;
                    }
                }
                catch (Exception ex) { service.shared.log($"Error 6: {ex.Message} --service.delacc_request.process_delacc_request"); }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 7: {ex.Message} --service.delacc_request.process_delacc_request");
            }
            return 500;
        }










    }
}
