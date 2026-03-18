using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class get_all_reviews_page_by_product_id
    {
        static MySqlConnection conn = null;


        public static Dictionary<string, object> communicate_get_all_reviews_page_by_product_id(string p_page, string p_amount, string p_product_id)
        {
            var result = new Dictionary<string, object>
    {
        { "statuscode", "200" },
        { "status", "success" },
        { "reviews", new List<Dictionary<string, string>>() },
        { "total_count", 0 }
    };

            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("get_all_reviews_page_by_product_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                   
                    cmd.Parameters.AddWithValue("p_page", p_page);
                    cmd.Parameters.AddWithValue("p_amount", p_amount);
                    cmd.Parameters.AddWithValue("p_product_id", p_product_id);

                    MySqlParameter countParam = new MySqlParameter("p_count_out", MySqlDbType.Int32);
                    countParam.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(countParam);
                  

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var reviews = (List<Dictionary<string, string>>)result["reviews"];

                        while (reader.Read())
                        {
                            var review = new Dictionary<string, string>();

                            string[] fields = { "product_id","id","title", "user_id", "body", "rating", "created_at"};

                            foreach (string field in fields)
                            {
                                review[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }

                            reviews.Add(review);
                        }
                    }

                   
                    result["total_count"] = cmd.Parameters["p_count_out"].Value;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_products.communicate_get_all_products");
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
