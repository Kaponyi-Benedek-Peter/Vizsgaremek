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
    internal class get_user_data
    {

        public static Dictionary<string, object> communicate_get_user_data(string id)
        {
            MySqlConnection conn = null;

            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "data", new List<Dictionary<string, string>>() }
            };

            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("get_user_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_id", id);


                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var data = (List<Dictionary<string, string>>)result["data"];

                        while (reader.Read())
                        {


                            var dat = new Dictionary<string, string>();

                            /*	
Teljes szövegek
id
email
created_at
sesstoken
passhash
sesstoken_expire
first_name
last_name
account_state
ban_reason
														*/
                            string[] fields = { "id","email","created_at", "first_name", "last_name", "account_state" };

                            foreach (string field in fields)
                            {
                                dat[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }

                           

                            data.Add(dat);
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
