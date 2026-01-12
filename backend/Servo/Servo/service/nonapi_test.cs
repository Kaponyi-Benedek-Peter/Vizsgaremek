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
                { "p_first_name", "Berg" },
                { "p_account_state", "unverified" },
                { "p_sesstoken", session_token },
                { "p_sesstoken_expire", DateTime.Now.AddDays(7).ToString("yyyy-MM-dd HH:mm:ss") }
            };


                model.registration_request.communicate_registration_request(lista);
               
            }

        }

      


        public static void addtestconfirmations()
        {

            for (int i = 0; i < 33; i++)
            {
                model.shared.add_confirmation(service.shared.gen_code(false), i.ToString(),i.ToString(), "account_deletion");
            }


            
        }

        public static void addtestproducts()
        {

            for (int i = 0; i < 33; i++)
            {
                model.shared.add_product($"product name","description",i,10,"a/a.png",999,Convert.ToInt32((double)i/2),"desc preview");
            }



        }
        public static void addtestorders()
        {

            for (int i = 0; i < 33; i++)
            {
                model.shared.add_order(i, "city", i*100, i*1000, "utca", 1,"használd a csengőt",i,"112");
            }



        }


        public static void deleteallconfirmations()
        {
            model.shared.delete_all_confirmations();
        }

        public static void deleteallproducts()
        {
            model.shared.delete_all_products();
        }

        public static void deleteallorders()
        {
            model.shared.delete_all_orders();
        }


    }







    }


