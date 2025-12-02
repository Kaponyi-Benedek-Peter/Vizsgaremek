using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.service
{
    internal class nonapi_test
    {



        public static void addtestusers()
        {

            for (int i = 0; i < 33; i++)
            {
                string session_token = service.shared.gen_code(false);
                Dictionary<string, string> lista = new Dictionary<string, string>
            {
                { "p_email", i+"test@gmail.com" },
                { "p_passhash", service.shared.hashpass(i.ToString()) },
                { "p_last_name", "Mc"+i },
                { "p_first_name", i+"Berg" },
                { "p_account_state", "unverified" },
                { "p_sesstoken", session_token },
                { "p_sesstoken_expire", DateTime.Now.AddDays(7).ToString("yyyy-MM-dd HH:mm:ss") }
            };


                model.registration_request.mainn(lista);
               
            }

        }


        public static void addtestconfirmations()
        {

            for (int i = 0; i < 33; i++)
            {
                model.shared.add_confirmation(service.shared.gen_code(false), i.ToString(),i.ToString(), "account_deletion");
            }


            
        }

        public static void deleteallconfirmations()
        {
            model.shared.delete_all_confirmations();
        }


        }







    }


