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

                model.shared.product prod = new model.shared.product
                {
                      name="product"+i,
  description_en     = "product" + i+"_en",
  description_hu     = "product" + i + "_hu",
  description_de     = "product" + i + "_de",
  price     = i,
  times_ordered     = 0,
  stock     = 10,
  sale_percentage     = 0,
  description_preview_en     = "description_preview_en",
  description_preview_de     = "description_preview_de",
  description_preview_hu     = "description_preview_hu",
                    category = "category",
                    name_hu     = "name_hu",
  name_de     = "name_de",
  name_en     = "name_en",
  manufacturer     = "manufacturer",
  brand     = "brand",
  rating     = 0.0,
  sku     = "sku",
  active_ingredient     = "active_ingredient",
  packaging     = "valami",
                };

                model.shared.add_product(prod);
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


