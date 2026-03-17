using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class chpass_request
    {
        public static int sendchpass(string email, string id, string newpasshash,string language)
        {
            string confirmation_token = service.shared.gen_code(false);



            model.shared.confirmation con = new model.shared.confirmation
            {
                confirmation_token = confirmation_token,
                value = newpasshash,
                confirmation_type = "password_change",
                user_id =id,


            };


            int result = model.shared.add_confirmation(con);

            if (result == 200)
            {
                




                (string firstname, string lastname) name = model.shared.get_name_by_id(id);



                string emailhtml = File.ReadAllText($"templates/password_reset_{language.ToUpper()}.html" ).Replace("{FIRST_NAME}", name.firstname)
                    .Replace("{LAST_NAME}", name.lastname)
                    .Replace("{RESET_URL}", $"{service.shared.current_url}/password-reset?chpass=" + service.shared.b64enc(id) + ";" + service.shared.b64enc(confirmation_token));


                service.shared.send_mail(email, "Password Change", emailhtml , "chpass");





                return 200;
            }
            else
            {
                return 500;
            }

               


        }











        public static int process_chpass_request(string controller_email,string controller_jelszo_uj,string language,string ip)
        {
            try
            {
                string controller_id = model.shared.get_id_by_email(controller_email);
                string fetched_token = model.shared.get_token_by_id(controller_id);

                string jelszo_uj = controller_jelszo_uj; //service.shared.Decrypt(fetched_token, controller_jelszo_uj);

                service.shared.log("Password change request: " + controller_id + "   -> " + controller_jelszo_uj + "  (" + ip);


                string model_password = model.shared.get_passhash_by_id(controller_id);
                string accstate = model.shared.get_account_state_by_id(controller_id);
                service.shared.log($"Debug 1: {accstate} --service.chpass_request.process_chpas_request ");
                if (accstate == "verified" || accstate == "admin" || accstate == "superadmin")
                {

                    int result1 = model.shared.delete_confirmations_by_user_id_and_type(controller_id, "password_change");
                    if (result1 == 200)
                    {
                        if(sendchpass(controller_email, controller_id, service.shared.hashpass(controller_jelszo_uj),language) == 200)
                        {
                            return 200;
                        }
                        else
                        {
                            return 500;
                        }
                    }
                    return 500;
                }

                else{
                    return 500;
                }
            }
            catch (Exception e) { service.shared.log($"Error 1: {e.Message} --service.chpass_request.process_chpas_request");return 1500; }

        }




    }
}
