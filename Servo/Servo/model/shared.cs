using MySql.Data.MySqlClient;
using Servo.service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Servo.model
{
    internal class shared
    {
       
        public static void init()
        {
            conn= new MySqlConnection(connStr);
            conn.Open();
            service.shared.log("! connection open !");
        }
        public static string connStr = "server=localhost;port=3307;user=root;password=root;database=roy;";

        public static MySqlConnection conn;
     
        /*
        public static string fetchsqlsing(string rw, string inntype, string inn, string outttype, string table, string newValue = null, Dictionary<string, string> lista = null)
        {
            string ret = "";
            
                conn.Open();
                if (rw == "r")
                {
                    using (MySqlCommand cmd = new MySqlCommand($"SELECT {outttype} FROM {table} WHERE {inntype} = @inn;", conn))
                    {
                        cmd.Parameters.AddWithValue("@inn", inn);
                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                ret = reader[outttype].ToString();
                            }
                        }
                    }
                }
                else if (rw == "w" && newValue != null)
                {
                    using (MySqlCommand cmd = new MySqlCommand($"UPDATE {table} SET {outttype} = @newValue WHERE {inntype} = @inn;", conn))
                    {
                        cmd.Parameters.AddWithValue("@newValue", newValue);
                        cmd.Parameters.AddWithValue("@inn", inn);
                        int rowsAffected = cmd.ExecuteNonQuery();
                        ret = rowsAffected.ToString();
                    }
                }
                else if (rw == "create_account_manual" && lista != null && lista.Count > 0)
                {


                    string columns = string.Join(", ", lista.Keys);
                    string paramNames = string.Join(", ", lista.Keys.Select(k => "@" + k));

                    using (MySqlCommand cmd = new MySqlCommand($"INSERT INTO {table} ({columns}) VALUES ({paramNames});", conn))
                    {
                        foreach (var kvp in lista)
                        {
                            cmd.Parameters.AddWithValue("@" + kvp.Key, kvp.Value);
                        }
                        int rowsAffected = cmd.ExecuteNonQuery();
                        ret = rowsAffected.ToString();
                    }
                }
                else if (rw == "create_account" && lista != null && lista.Count > 0)
                {
                    using (MySqlCommand cmd = new MySqlCommand("create_account", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@p_id", lista["p_id"]);
                        cmd.Parameters.AddWithValue("@p_sesstoken", lista["p_sesstoken"]);
                        cmd.Parameters.AddWithValue("@p_passhash", lista["p_passhash"]);
                        cmd.Parameters.AddWithValue("@p_sesstoken_expire", lista["p_sesstoken_expire"]);
                        cmd.Parameters.AddWithValue("@p_first_name", lista["p_first_name"]);
                        cmd.Parameters.AddWithValue("@p_last_name", lista["p_last_name"]);
                        cmd.Parameters.AddWithValue("@p_account_state", lista["p_account_state"]);
                        cmd.ExecuteNonQuery();

                        ret = "ok";
                    }
                }


                else if (rw == "delete_account" && lista != null && lista.Count > 0)
                {
                    using (MySqlCommand cmd = new MySqlCommand("delete_account", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@p_id", lista["p_id"]);
                        cmd.ExecuteNonQuery();

                        ret = "ok";
                    }
                }



                else if (rw == "refresh_token" && lista != null && lista.Count > 0)
                {
                    using (MySqlCommand cmd = new MySqlCommand("refresh_token", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@p_id", lista["p_id"]);
                        cmd.Parameters.AddWithValue("@p_new_sesstoken", lista["p_new_sesstoken"]);
                        cmd.ExecuteNonQuery();

                        ret = "ok";
                    }
                }



                else if (rw == "add_confirmation" && lista != null && lista.Count > 0)
                {
                    using (MySqlCommand cmd = new MySqlCommand("add_confirmation", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                       
                        cmd.Parameters.AddWithValue("@p_confirmation_token", lista["p_confirmation_token"]);
                        cmd.Parameters.AddWithValue("@p_identification", lista["p_identification"]);
                        cmd.Parameters.AddWithValue("@p_new_value", lista["p_new_value"]);
                        cmd.Parameters.AddWithValue("@p_confirmation_type", lista["p_confirmation_type"]);
                        cmd.ExecuteNonQuery();

                        ret = "ok";
                    }
                }



                else
                {

                service.shared.log($"@fetchsqlsing: {rw} (ismeretlen funckió)");
                }


                conn.Close();

            return ret;
        }
        */
    
        public static string get_email_by_id(string id)
        {
            try
            {
                

                string userToken = null;

                using (MySqlCommand cmd = new MySqlCommand("get_user_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            
                            userToken = reader["email"]?.ToString();
                        }
                    }
                }

                if (userToken != null)
                    return userToken;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message+ " -get_email_by_id");
                return "500";
            }

        }


        public static string get_token_by_id(string id)
        {
            try
            {
               

                string userToken = null;

                using (MySqlCommand cmd = new MySqlCommand("get_user_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            userToken = reader["sesstoken"]?.ToString();
                        }
                    }
                }

                if (userToken != null)
                    return userToken;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -get_token_by_id");
                return "500";
            }

        }


        public static Dictionary<string, string> get_full_confirmation_by_identification(string identification)
        {
            var list = new Dictionary<string, string> { };
            list.Add("error", "false");
            try
            {



                
                
                using (MySqlCommand cmd = new MySqlCommand("get_confirmations_by_identification", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_identification", identification);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {


                            list.Add("new_value", reader.IsDBNull(reader.GetOrdinal("new_value")) ? "" : reader["new_value"].ToString());
                            list.Add("confirmation_token", reader.IsDBNull(reader.GetOrdinal("confirmation_token")) ? "" : reader["confirmation_token"].ToString());
                            list.Add("confirmation_token_expire", reader.IsDBNull(reader.GetOrdinal("confirmation_token_expire")) ? "" : reader["confirmation_token_expire"].ToString());
                            list.Add("confirmation_type", reader.IsDBNull(reader.GetOrdinal("confirmation_type")) ? "" : reader["confirmation_type"].ToString());

                            service.shared.log($"new_value:{reader["new_value"]?.ToString()}");
                            service.shared.log($"confirmation_token:{reader["confirmation_token"]?.ToString()}");
                            service.shared.log($"confirmation_token_expire:{reader["confirmation_token_expire"]?.ToString()}");
                            service.shared.log($"confirmation_type:{reader["confirmation_type"]?.ToString()}");
                       


                        }
                    }
                }
                
            }
            catch (Exception ex) {
                service.shared.log(ex.Message + " -get_full_confirmation_by_identification");
                list["error"] = "true";
            }

            return list;
        }

        public static string get_account_state_by_id(string id)
        {
            try
            {
                

                string userToken = null;

                using (MySqlCommand cmd = new MySqlCommand("get_user_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            userToken = reader["account_state"]?.ToString();
                        }
                    }
                }

                if (userToken != null)
                    return userToken;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -get_account_state_by_id: "+id);
                return "500";

            }
        }

        public static string get_passhash_by_id(string id)
        {
            try
            {
               

                string userToken = null;

                using (MySqlCommand cmd = new MySqlCommand("get_user_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            userToken = reader["passhash"]?.ToString();
                        }
                    }
                }

                if (userToken != null)
                    return userToken;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -get_passhash_by_id");
                return "500";

            }
        }


        public static string get_sesstoken_expiration_by_id(string id)
        {
            try
            {
                

                string userToken = null;

                using (MySqlCommand cmd = new MySqlCommand("get_user_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            userToken = reader["sesstoken_expire"]?.ToString();
                        }
                    }
                }

                if (userToken != null)
                    return userToken;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -get_sesstoken_expiration_by_id");
                return "500";

            }
        }


        public static string get_id_by_email(string email)
        {
            try
            {
                

                string userToken = null;

                using (MySqlCommand cmd = new MySqlCommand("get_user_by_email", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_email", email);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            userToken = reader["id"]?.ToString();
                        }
                    }
                }

                if (userToken != null)
                    return userToken;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -get_id_by_email");
                return "500";
            }

        }


        public static int add_confirmation(string confirmation_token, string identification, string value, string type)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("create_confirmation", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_confirmation_token", confirmation_token);
                    cmd.Parameters.AddWithValue("@p_identification", identification);
                    cmd.Parameters.AddWithValue("@p_new_value", value);
                    cmd.Parameters.AddWithValue("@p_type", type);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -add_confirmation");
                return 500;
            }
        }


        public static string refresh_token(string id, string new_sesstoken)
        {
            try
            {
                

                string userToken = null;

                using (MySqlCommand cmd = new MySqlCommand("refresh_token_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);
                    cmd.Parameters.AddWithValue("@p_new_sesstoken", new_sesstoken);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            userToken = reader["account_state"]?.ToString();
                        }
                    }
                }

                if (userToken != null)
                    return userToken;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -refresh_token");
                return "500";

            }
        }







        public static int delete_all_users()
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_all_users", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -delete_all_users");
                return 500;
            }
        }

        public static int delete_all_confirmations()
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_all_confirmations", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -delete_all_confirmations");
                return 500;
            }
        }
        public static int delete_all_orders()
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_all_orders", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -delete_all_orders");
                return 500;
            }
        }

        public static int delete_all_posts()
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_all_posts", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -delete_all_orders");
                return 500;
            }
        }


        public static int delete_all_products()
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_all_products", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log(ex.Message + " -delete_all_products");
                return 500;
            }
        }




    }
}
