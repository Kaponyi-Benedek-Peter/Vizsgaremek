using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class get_all_product_categories
    {

        static MySqlConnection conn = model.shared.conn;





        public static Dictionary<string, object> communicate_get_all_product_categories()
        {
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "product_categories", new List<Dictionary<string, string>>() }
            };

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("get_all_product_categories", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var categories = (List<Dictionary<string, string>>)result["product_categories"];

                        while (reader.Read())
                        {
                            var category = new Dictionary<string, string>();


                            string[] fields = { "category","emoji","color", "number_of_products", "id"};

                            foreach (string field in fields)
                            {
                                category[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }

                           
                            categories.Add(category);
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_product_categories.communicate_get_all_product_categories");
                result["statuscode"] = "500";
                result["status"] = "unknown error";

            }

            return result;
        }





    }
}
