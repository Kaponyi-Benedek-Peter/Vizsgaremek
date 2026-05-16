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
    internal class create_order
    {


        //Teljes szövegek
        /*
         
  cmd.Parameters.AddWithValue("@p_user_id", ord.user_id);
  cmd.Parameters.AddWithValue("@p_email", ord.email);
  cmd.Parameters.AddWithValue("@p_billing_name", ord.billing_name);
  cmd.Parameters.AddWithValue("@p_shipping_name", ord.shipping_name);
  cmd.Parameters.AddWithValue("@p_tracking_token", ord.tracking_token);
  cmd.Parameters.AddWithValue("@p_order_status", ord.order_status);
  cmd.Parameters.AddWithValue("@p_shipping_company", ord.shipping_company);
  cmd.Parameters.AddWithValue("@p_confirmed", ord.confirmed);
  cmd.Parameters.AddWithValue("@p_price", ord.price);
  cmd.Parameters.AddWithValue("@p_city", ord.city);
  cmd.Parameters.AddWithValue("@p_zipcode", ord.zipcode);
  cmd.Parameters.AddWithValue("@p_address", ord.address);
  cmd.Parameters.AddWithValue("@p_apartment_number", ord.apartment_number);
  cmd.Parameters.AddWithValue("@p_note", ord.note);
  cmd.Parameters.AddWithValue("@p_house_number", ord.house_number);
  cmd.Parameters.AddWithValue("@p_phone_number", ord.house_number);

         */
        public static (int,string) process_create_order(string controller_user_id, string controller_session_token,
            string email, string billing_name, string shipping_name, 
            string shipping_company, string price, string city, string guest,
             string zipcode, string address, string apartment_number, string note, string house_number, string phone_number, List<model.shared.order_item> order_items)
        {
            try
            {
                service.shared.log("Create order request: " + city);

                string model_session_token = model.shared.get_token_by_id(controller_user_id);

                string accstate ="unknown"; 

                if (guest == "0") {
                 accstate = model.shared.get_account_state_by_id(controller_user_id);
                }


                //MessageBox.Show(accstate);
                if ((model_session_token != controller_session_token) && guest=="0")
                {
                    return (401,"error");
                }
                else
                {


                    model.shared.order ord;

                    if (guest=="1" || (guest=="0" &&( accstate == "admin" || accstate == "superadmin" || accstate== "verified")))
                    {
                        string tracking_token_new = service.shared.gen_code(false);

                    

                        try
                        {
                            string user_id_temp = controller_user_id;
                            if(guest=="1")
                            {
                                user_id_temp = "0";
                            }
                            
                            ord = new model.shared.order{
                                email = email,
                                user_id = user_id_temp,
                                billing_name = billing_name,
                                shipping_name = shipping_name,
                                tracking_token = tracking_token_new,
                                order_status = "pending",
                                shipping_company = shipping_company,
                                price = price,
                                city = city,
                                zipcode = zipcode,
                                address = address,
                                apartment_number = apartment_number,
                                note = note,
                                house_number = house_number,
                                phone_number = phone_number,
                                guest=guest



                        };
                        }
                        catch (Exception ex)
                        {

                            return (400, "error");
                        }


                        (int,string) result = model.shared.add_order(ord);

                        if (result.Item1 == 200)
                        {
                            Boolean no_errors = true;

                            foreach (var item in order_items)
                            {

                               item.order_id = result.Item2;
                                if (model.shared.add_order_item(item) != 200)
                                {
                                    no_errors = false;
                                }


                            }

                            if (no_errors) { return (200, tracking_token_new); }
                            else
                            {
                              return (500, "error");
                            }
                           
                        }
                        else
                        {
                            return (500, "error");
                        }

                    }

                    else
                    {

                        return (403, "error");
                    }

                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --service.create_order.process_create_order");
                return (400, "error");
            }
        }






    }
}
