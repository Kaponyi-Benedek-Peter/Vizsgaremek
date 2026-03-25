using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class login_request
    {

        public static int process_login(string controller_jelszo,string email,string language)
        {

            string model_user_id = model.shared.get_id_by_email(email);
            string model_password = model.shared.get_passhash_by_id(model_user_id);
            string accstate = model.shared.get_account_state_by_id(model_user_id);
            service.shared.log($"Debug 1: {service.shared.hashpass(controller_jelszo)} || {model_password} --service.login.process_login");
            if (model_password == service.shared.hashpass(controller_jelszo) && (accstate == "verified" || accstate=="admin" ) )
            {
                // bejelentkeztetés oké





                string new_confirmation_token = service.shared.gen_code(false);

               


                    model.shared.confirmation con = new model.shared.confirmation
                    {
                        confirmation_token = new_confirmation_token,
                        value = "-",
                        confirmation_type = "login",
                        user_id = model_user_id,


                    };



                int result = model.shared.add_confirmation(con);

                    if (result != 200)
                    {

                        return 500;

                    }






                    sendlogin(email, model_user_id,new_confirmation_token,language);
                


                return 200;
            }

            else
            {

                string recieved_passhash = model.shared.get_passhash_by_id(model_user_id);
                if (recieved_passhash != service.shared.hashpass(controller_jelszo))
                {
                    
                    return 401;
                }

                else
                {
                    return 500;
                }
                // nem oké


            }



        }

        
        public static void sendlogin(string hova,string id, string confirmation_token, string language)
        {
            string new_sesstoken = service.shared.gen_code(false);
            string result = model.shared.refresh_token(id, new_sesstoken);


            string jwt_token = jwt_handler.generate_token(hova);


            string expires_in_formatted = jwt_handler.generate_expiration_string();



            string expiration = model.shared.get_sesstoken_expiration_by_id(id);
         //   MessageBox.Show(expiration);


            



            (string firstname, string lastname) name = model.shared.get_name_by_id(id);



            string emailhtml = File.ReadAllText($"templates/login_{language.ToUpper()}.html"
             ).Replace("{LOGIN_URL}", $"{service.shared.current_url}login-promise?login_promise=" + service.shared.b64enc(id) + ";" + service.shared.b64enc(confirmation_token))
           ;


            service.shared.send_mail(hova, "Secure Login", emailhtml , "login");








            //testpanel.Instance.textBox2.Text = session_token; // csak tesztelés miatt

        }




    }
}
