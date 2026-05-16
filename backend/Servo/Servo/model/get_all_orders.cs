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

        static MySqlConnection conn = model.shared.conn;





        public static Dictionary<string, object> communicate_get_all_orders()
        {
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "orders", new List<Dictionary<string, string>>() }
            };

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("get_all_orders", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var orders = (List<Dictionary<string, string>>)result["orders"];

                        while (reader.Read())
                        {
                            var order = new Dictionary<string, string>();


                            string[] fields = { "id","user_id","created_at", "price", "city", "apartment_number", "note", "house_number", "phone_number" };

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
                service.shared.log($"Error 1: {ex.Message} --model.get_all_orders.communicate_get_all_orders");
                result["statuscode"] = "500";
                result["status"] = "unknown error";

            }

            return result;
        }





    }
}
