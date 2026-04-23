using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class get_all_users
    {

        static MySqlConnection conn = model.shared.conn;





        public static Dictionary<string, object> communicate_get_all_users()
        {
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "users", new List<Dictionary<string, string>>() }
            };

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("get_all_users", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = (List<Dictionary<string, string>>)result["users"];

                        while (reader.Read())
                        {
                            var user = new Dictionary<string, string>();


                            string[] fields = { "id","email","created_at", "first_name","last_name","account_state"};

                            foreach (string field in fields)
                            {
                                user[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }

                            
                            users.Add(user);
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_users.communicate_get_all_users");
                result["statuscode"] = "500";
                result["status"] = "unknown error";

            }

            return result;
        }





    }
}
