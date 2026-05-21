using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace Servo.model
{
    internal class get_post_comments_by_post_id
    {
        public static Dictionary<string, object> communicate_get_post_comments_by_post_id(string p_post_id)
        {
            MySqlConnection conn = null;
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "comments", new List<Dictionary<string, string>>() }
            };
            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("get_post_comments_by_post_id", conn))
                {
                    cmd.CommandTimeout = 10;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new MySqlParameter("p_post_id", MySqlDbType.Int32)
                    {
                        Value = p_post_id
                    });
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var comments = (List<Dictionary<string, string>>)result["comments"];
                        while (reader.Read())
                        {
                            var comment = new Dictionary<string, string>();
                            string[] fields = { "id", "post_id", "user_id", "first_name", "last_name", "email", "content", "likes", "created_at" };
                            foreach (string field in fields)
                            {
                                int ordinal = reader.GetOrdinal(field);
                                comment[field] = reader.IsDBNull(ordinal) ? "" : reader.GetValue(ordinal).ToString();
                            }
                            comments.Add(comment);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_post_comments_by_post_id.communicate_get_post_comments_by_post_id");
                result["statuscode"] = "500";
                result["status"] = "internal_error";
            }
            finally
            {
                if (conn != null) conn.Close();
            }
            return result;
        }
    }
}