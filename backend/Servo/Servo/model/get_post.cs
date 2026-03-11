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
    internal class get_post
    {
        static MySqlConnection conn = model.shared.conn;


        public static Dictionary<string, object> communicate_get_post(string id)
        {
            var result = new Dictionary<string, object>
    {
        { "statuscode", "200" },
        { "status", "success" },
        { "post", new Dictionary<string, string>() }
    };

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("get_post_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var post = (Dictionary<string, string>)result["post"];

                        if (reader.Read())
                        {//

                            string[] fields = { "id", "title", "content", "user_id", "created_at", "image_url",
                             "category_id", "updated_at" , "slug", "excerpt" , "status", "views",
                             "likes", "comment_count"  ,"is_featured", "published_at" , "last_activity_at", "tags" };

                            foreach (string field in fields)
                            {
                                int ordinal = reader.GetOrdinal(field);
                                if (reader[field] == DBNull.Value)
                                {
                                    post[field] = "";
                                }
                                else
                                {
                                    post[field] = reader[field].ToString();
                                }

                            }

                        }
                    }

                  
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_post.communicate_get_post");
                result["statuscode"] = "500";
                result["status"] = "internal_error";
            }

            return result;
        }



    }
}
