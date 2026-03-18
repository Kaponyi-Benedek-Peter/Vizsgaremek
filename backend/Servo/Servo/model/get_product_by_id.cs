using Google.Protobuf.Collections;
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
    internal class get_product_by_id
    {
        static MySqlConnection conn = null;


        public static Dictionary<string, object> communicate_get_product_by_id(string id)
        {
            var result = new Dictionary<string, object>
    {
        { "statuscode", "200" },
        { "status", "success" },
        { "product", new Dictionary<string, string>() }
    };

            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("get_product_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var product = (Dictionary<string, string>)result["product"];

                        if (reader.Read())
                        {//

                            string[] fields = { "id","name_hu","name_en", "name_de", "description_hu", "description_en", "description_de","description_preview_hu","description_preview_en",  "description_preview_de", "price_huf", "times_ordered",
                                      "stock", "sale_percentage",

                                      "category_id", "manufacturer", "brand",
                                      "rating", "sku", "active_ingredients", "packaging", "created_at",
                                      "updated_at" };

                            foreach (string field in fields)
                            {
                                int ordinal = reader.GetOrdinal(field);
                                if (reader[field] == DBNull.Value)
                                {
                                    product[field] = "";
                                }
                                else
                                {
                                    product[field] = reader[field].ToString();
                                }

                            }

                        }
                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_product_by_id.communicate_get_product_by_id");
                result["statuscode"] = "500";
                result["status"] = "internal_error";
            }
            finally
            {
                if (conn != null) conn.Dispose();
            }

            return result;
        }



    }
}
