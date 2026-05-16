using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class get_all_orders
    {


        public static Dictionary<string, object> communicate_get_order_items_by_order_id(string order_id)
        {
            MySqlConnection conn = null;
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "items", new List<Dictionary<string, string>>() }
            };

            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("get_order_items_by_order_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("p_order_id", order_id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var items = (List<Dictionary<string, string>>)result["items"];

                        while (reader.Read())
                        {
                            var item = new Dictionary<string, string>();


                            string[] fields = { "id", "order_id", "product_id", "quantity", "price", "unit_price", "product_name_hu", "product_name_en", "product_name_de", "thumbnail_url", "sku" };

                            foreach (string field in fields)
                            {
                                item[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }


                            items.Add(item);
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_orders_user.communicate_get_order_items_by_order_id");
                result["statuscode"] = "500";
                result["status"] = "internal_error";

            }
            finally
            {
                if (conn != null)
                {
                    conn.Close();
                }
            }

            return result;
        }




        public static Dictionary<string, object> communicate_get_all_orders()
        {   
            MySqlConnection conn = null;
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "orders", new List<Dictionary<string, object>>() }
            };

            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("get_all_orders", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var orders = (List<Dictionary<string, object>>)result["orders"];

                        while (reader.Read())
                        {
                            var order = new Dictionary<string, object>();


                            string[] fields = { "id","user_id","created_at", "price", "city", "apartment_number", "note", "house_number", "phone_number" };

                            foreach (string field in fields)
                            {
                                order[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }
                            order["products"] = communicate_get_order_items_by_order_id(order["id"].ToString())["items"]; 

                            orders.Add(order);
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_orders.communicate_get_all_orders");
                result["statuscode"] = "500";
                result["status"] = "internal_error";

            }
            finally
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }

            return result;
        }





    }
}
