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

                /*
                 

                
                cmd.Parameters.AddWithValue("@p_email", usr.email);
                cmd.Parameters.AddWithValue("@p_sesstoken", usr.sesstoken);
                cmd.Parameters.AddWithValue("@p_passhash", usr.passhash);
                cmd.Parameters.AddWithValue("@p_sesstoken_expire", usr.sesstoken_expire);
                cmd.Parameters.AddWithValue("@p_first_name", usr.first_name);
                cmd.Parameters.AddWithValue("@p_last_name", usr.last_name);
                cmd.Parameters.AddWithValue("@p_account_state", usr.p_account_state);              */

                model.shared.user usr = new model.shared.user
                {
                    email = i + "test@gmail.com",
                    sesstoken = session_token,
                    sesstoken_expire = DateTime.Now.AddDays(7).ToString("yyyy-MM-dd HH:mm:ss"),
                    passhash = service.shared.hashpass(i.ToString()),
                    first_name = "Berg",
                    last_name = "Mc" + i,
                    p_account_state = "unverified",
                   
                };



                model.registration_request.communicate_registration_request(usr);
               
            }

        }

      


        public static void addtestconfirmations(int start_id)
        {

            for (int i = 0; i < 33; i++)
            {

                model.shared.confirmation con = new model.shared.confirmation
                {
                    confirmation_token = service.shared.gen_code(false),
                     value = (i).ToString(),
                    confirmation_type = "account_deletion",
                     user_id = (i+start_id).ToString(),


                };
                

                model.shared.add_confirmation(con);
            }


            
        }

        public static void addtestcategories(string categoryname, string emoji, string color,  int number_of_products)
        {


                model.shared.category cat = new model.shared.category
                {


                    category_name= categoryname,
                    color = color,
                    emoji=emoji,
                    number_of_products=number_of_products


                };


                model.shared.add_category(cat);
          
            service.shared.log($"[Added categoryy]");

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
                                    category_id = "1",
                                    name_hu     = "name_hu",
                  name_de     = "name_de",
                  name_en     = "name_en",
                  manufacturer     = "manufacturer",
                  brand     = "brand",
                  rating     = 0.0,
                  sku     = (i*1000).ToString(),
                  active_ingredient     = "active_ingredient",
                  packaging     = "valami",
                  thumbnail_url = $"http://192.168.11.213:90/assets/products/{i}/thumbnail.webp",

                    featured = $"0"
                };

                model.shared.add_product(prod);
            }



        }


        public static void addtestreviews(string product_id_in)
        {

            for (int i = 0; i < 33; i++)
            {

                model.shared.review rev = new model.shared.review
                {
                    product_id=product_id_in,
                     title = "title",
                     body = "body",
                     rating = "1",
                     user_id = i,

                };

                model.shared.add_review(rev);
            }



        }


        public static void addtestorders(int user_id)
        {

            for (int i = 0; i < 33; i++)
            {


                model.shared.order ord = new model.shared.order
                {
                    user_id  = (user_id).ToString(),
                    city = "city",
                    zipcode  = i*100,
                    price = i*1000,
                    address  = "utca",
                    apartment_number = "1",
                    note = "használd a csengőt!!",
                    house_number = i.ToString(),
                    phone_number  = "112",

                };

               

                model.shared.add_order(ord);
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

        public static void deleteallreviews()
        {
            model.shared.delete_all_reviews();
        }






        public static void addtestimages(int product_id)
        {

            for (int i = 0; i < 3; i++)
            {


                model.shared.product_image img = new model.shared.product_image
                {
                    /*
                     p_alt_text_de,
                        p_alt_text_en,
                        p_alt_text_hu,
                        p_image_url,
                        p_sort_id,
                        p_product_id
                     
                     */
                    alt_text_hu = (product_id).ToString(),
                    alt_text_en= "city",
                    alt_text_de= "alt_text_de",
                    image_url= $"https://www.roysshack.hu/assets/products/{product_id}/{i}",
                    sort_id= i,
                    product_id= product_id

                };

                model.shared.add_product_image(img);
            }



        }




        public static void deleteallimages()
        {

           
              //  model.shared.delet();
            



        }








































































    }







    }


