using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class get_all_products
    {

        static MySqlConnection conn = model.shared.conn;





        public static Dictionary<string, object> communicate_get_all_products()
        {
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "products", new List<Dictionary<string, string>>() }
            };

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("get_all_products", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var products = (List<Dictionary<string, string>>)result["products"];

                        while (reader.Read())
                        {
                            var product = new Dictionary<string, string>();

                            
                            string[] fields = { "id","name_hu","name_en", "name_de", "description_hu", "description_en", "description_de","description_preview_hu","description_preview_en",  "description_preview_de", "price_huf", "times_ordered",
                                      "stock", "sale_percentage", 
                                       
                                      "category_id", "manufacturer", "brand",
                                      "rating", "sku", "active_ingredients", "packaging", "created_at",
                                      "updated_at" , "thumbnail_url"};

                            foreach (string field in fields)
                            {
                                product[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }

                            product["price_usd"] = service.shared.exchange(Convert.ToDouble(product["price_huf"]))[0].ToString();
                            product["price_eur"] = service.shared.exchange(Convert.ToDouble(product["price_huf"]))[1].ToString();


                            products.Add(product);
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_products.communicate_get_all_products");
                result["statuscode"] = "500";
                result["status"] = "unknown error";

            }

            return result;
        }





    }
}
