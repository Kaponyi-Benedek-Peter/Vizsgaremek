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
    internal class get_all_posts
    {

         




        public static Dictionary<string, object> communicate_get_all_posts(string category)
        {
          

            MySqlConnection conn = null;

            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "posts", new List<Dictionary<string, string>>() }
            };

            try
            {
               
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
               
                using (MySqlCommand cmd = new MySqlCommand("get_all_posts", conn))
                {
                    cmd.CommandTimeout = 10;
                   
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new MySqlParameter("p_category_id", MySqlDbType.VarChar, 20)
                    {
                        Value = string.IsNullOrEmpty(category) ? (object)DBNull.Value : category
                    });
                    cmd.Parameters.Add(new MySqlParameter("p_status", MySqlDbType.VarChar, 20)
                    {
                        Value = "published"
                    });
                  

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var posts = (List<Dictionary<string, string>>)result["posts"];

                        while (reader.Read())
                        {
                           

                            var post = new Dictionary<string, string>();

                            string[] fields = { "id","title","content", "updated_at", "slug", "excerpt",
    "status","views","likes", "comment_count", "is_featured", "published_at",
    "last_activity_at", "tags", "category_id" };

                            foreach (string field in fields)
                            {
                                int ordinal = reader.GetOrdinal(field);
                                if (reader.IsDBNull(ordinal))
                                {
                                    post[field] = "";
                                }
                                else
                                {
                                    post[field] = reader.GetValue(ordinal).ToString();
                                }
                            }
                          


                            posts.Add(post);
                        }
                       
                    }
                  

                }
               
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_products.communicate_get_all_posts");
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
