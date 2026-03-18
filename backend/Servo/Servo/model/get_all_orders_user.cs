using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace Servo.model
{
    internal class get_all_orders_user
    {

         





        public static Dictionary<string, object> communicate_get_all_orders_user(string user_id)
        {
            MySqlConnection conn = null;
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "orders", new List<Dictionary<string, string>>() }
            };

            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("get_all_order_by_user_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("p_user_id", user_id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var orders = (List<Dictionary<string, string>>)result["orders"];

                        while (reader.Read())
                        {
                            var order = new Dictionary<string, string>();


                            string[] fields = { "id", "user_id", "created_at", "price", "city", "apartment_number", "note", "house_number", "phone_number" };

                            foreach (string field in fields)
                            {
                                order[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }


                            orders.Add(order);
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_orders_user.communicate_get_all_orders_user");
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





    }
}
