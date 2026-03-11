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
    internal class get_all_posts_admin
    {

        static MySqlConnection conn = model.shared.conn;





        public static Dictionary<string, object> communicate_get_all_posts_admin(string category)
        {
            service.shared.log("-1");
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "posts", new List<Dictionary<string, string>>() }
            };

            try
            {       
                using (MySqlCommand cmd = new MySqlCommand("get_all_posts", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_category_id", category);

                    cmd.Parameters.AddWithValue("p_status", "");

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var posts = (List<Dictionary<string, string>>)result["posts"];

                        while (reader.Read())
                        {


                            var post = new Dictionary<string, string>();

                            /*	id	title		user_id	created_at														*/
                            string[] fields = { "id","title","content", "updated_at", "slug", "excerpt", "status","views","likes",  "comment_count", "is_featured", "published_at", "last_activity_at", "tags",
                                      "image_url", "category_id", "status",
                                      };

                            foreach (string field in fields)
                            {
                                post[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }

                            post["image_url"] = service.shared.current_url + "assets/posts/" + post["id"] + "/thumbnail.webp";


                            posts.Add(post);
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_products_admin.communicate_get_all_posts_admin");
                result["statuscode"] = "500";
                result["status"] = "internal_error";

            }

            return result;
        }





    }
}
