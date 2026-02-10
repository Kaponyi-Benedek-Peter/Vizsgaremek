using MySql.Data.MySqlClient;
using Servo.service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Linq;

namespace Servo.model
{
    internal class shared
    {


        public class confirmation
        {


            public string confirmation_token { get; set; } = "";
            public string user_id { get; set; } = "";
            public string value { get; set; } = "";
            public string type { get; set; } = "";

        }


        public class order
        {
            public string user_id { get; set; } = "";
            public string city { get; set; } = "";
            public int zipcode { get; set; } = 0;
            public int price { get; set; } = 0;
            public string address { get; set; } = "";
            public string apartment_number { get; set; } = "";
            public string note { get; set; } = "";
            public string house_number { get; set; } = "";
            public string phone_number { get; set; } = "";

        }


        public class user
        {

            public string email { get; set; } = "";
            public string sesstoken { get; set; } = "";
            public string passhash { get; set; } = "";
            public string sesstoken_expire { get; set; } = "";
            public string first_name { get; set; } = "";
            public string last_name { get; set; } = "";
            public string p_account_state { get; set; } = "";


        }




        public class product
        {
            public string name;
            public string description_en { get; set; } = "";
            public string description_hu { get; set; } = "";
            public string description_de { get; set; } = "";
            public int price { get; set; } = 0;
            public int times_ordered { get; set; } = 0;
            public int stock { get; set; } = 0;
            public int sale_percentage { get; set; } = 0;
            public string description_preview_en { get; set; } = "";
            public string description_preview_de { get; set; } = "";
            public string description_preview_hu { get; set; } = "";

            public string category { get; set; } = "";
            public string name_hu { get; set; } = "";
            public string name_de { get; set; } = "";
            public string name_en { get; set; } = "";
            public string manufacturer { get; set; } = "";
            public string brand { get; set; } = "";
            public double rating { get; set; } = 0.0;
            public string sku { get; set; } = "";
            public string active_ingredient { get; set; } = "";
            public string created_at { get; set; } = "";
            public string updated_at { get; set; } = "";
            public string packaging { get; set; } = "";
        }


            public class review
            {
                public string product_id;
                public string title { get; set; } = "";
                public string body { get; set; } = "";
                public string rating { get; set; } = "";
                public int created_at { get; set; } = 0;
                public int user_id { get; set; } = 0;
                
            }



            public static void init()
        {
            conn= new MySqlConnection(connStr);
            conn.Open();
            service.shared.log("[mysql connection open]");
        }
        public static string connStr = $"server={service.shared.conf("r", "sql_conn_server")};port={service.shared.conf("r","sql_conn_port")};user={service.shared.conf("r", "sql_conn_user")};password={service.shared.conf("r", "sql_conn_password")};database={service.shared.conf("r", "sql_conn_database")};";

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
                        cmd.Parameters.AddWithValue("@p_user_id", lista["p_user_id"]);
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
                service.shared.log($"Error: {ex.Message} --model.shared.get_email_by_id");
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
                service.shared.log($"Error: {ex.Message} --model.shared.get_token_by_id");
                return "500";
            }

        }


        public static Dictionary<string, string> get_full_confirmation_by_user_id(string user_id,string type)
        {
            var list = new Dictionary<string, string> { };
            list.Add("error", "false");
            try
            {



                
                
                using (MySqlCommand cmd = new MySqlCommand("get_confirmations_by_user_id_and_type", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_user_id", user_id);
                    cmd.Parameters.AddWithValue("@p_confirmation_type", type);


                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {


                            list.Add("new_value", reader.IsDBNull(reader.GetOrdinal("new_value")) ? "" : reader["new_value"].ToString());
                            list.Add("confirmation_token", reader.IsDBNull(reader.GetOrdinal("confirmation_token")) ? "" : reader["confirmation_token"].ToString());
                            list.Add("confirmation_token_expire", reader.IsDBNull(reader.GetOrdinal("confirmation_token_expire")) ? "" : reader["confirmation_token_expire"].ToString());
                            list.Add("confirmation_type", reader.IsDBNull(reader.GetOrdinal("confirmation_type")) ? "" : reader["confirmation_type"].ToString());
                            /*
                            service.shared.log($"new_value:{reader["new_value"]?.ToString()}");
                            service.shared.log($"confirmation_token:{reader["confirmation_token"]?.ToString()}");
                            service.shared.log($"confirmation_token_expire:{reader["confirmation_token_expire"]?.ToString()}");
                            service.shared.log($"confirmation_type:{reader["confirmation_type"]?.ToString()}");
                            */


                        }
                    }
                }
                
            }
            catch (Exception ex) {
                service.shared.log($"Error: {ex.Message} --model.shared.get_full_confirmation_by_user_id");
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
                service.shared.log($"Error: {ex.Message} --model.shared.get_account_state_by_id");
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
                service.shared.log($"Error: {ex.Message} --model.shared.get_passhash_by_id");
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
                service.shared.log($"Error: {ex.Message} --model.shared.get_sesstoken_expiration_by_id");
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
                service.shared.log($"Error: {ex.Message} --model.shared.get_id_by_email");
                return "500";
            }

        }


        public static int add_confirmation(confirmation con)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("create_confirmation", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_confirmation_token", con.confirmation_token);
                    cmd.Parameters.AddWithValue("@p_user_id", con.user_id);
                    cmd.Parameters.AddWithValue("@p_new_value", con.value);
                    cmd.Parameters.AddWithValue("@p_type", con.type);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --model.shared.add_confirmation");
                return 500;
            }
        }



        //delete_confirmations_by_user_id_and_type
        public static int delete_confirmations_by_user_id_and_type(string user_id, string type)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_confirmations_by_user_id_and_type", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_user_id", user_id);
                    cmd.Parameters.AddWithValue("@p_confirmation_type", type);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --model.shared.delete_confirmations_by_user_id_and_type");
                return 500;
            }
        }


        public static int add_product(product prod)
        {

            try
            {//id name_de description_en price_huf times_ordered stock sale_percentage description_preview_en name_hu
             //name_en description_hu description_de description_preview_hu description_preview_de
             //category manufacturer brand rating sku active_ingredients packaging created_at updated_at name
                using (MySqlCommand cmd = new MySqlCommand("create_product", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;


                    
                    
                    cmd.Parameters.AddWithValue("@p_price_huf", prod.price);
                    cmd.Parameters.AddWithValue("@p_times_ordered", prod.times_ordered);
                    cmd.Parameters.AddWithValue("@p_stock", prod.stock);
                    cmd.Parameters.AddWithValue("@p_sale_percentage", prod.sale_percentage);


                    cmd.Parameters.AddWithValue("@p_description_preview_hu", prod.description_preview_hu);
                    cmd.Parameters.AddWithValue("@p_description_preview_en", prod.description_preview_en);
                    cmd.Parameters.AddWithValue("@p_description_preview_de", prod.description_preview_en);


                    cmd.Parameters.AddWithValue("@p_category", prod.category);

                    cmd.Parameters.AddWithValue("@p_name", prod.name);
                    cmd.Parameters.AddWithValue("@p_name_hu", prod.name_hu);
                    cmd.Parameters.AddWithValue("@p_name_en", prod.name_en);
                    cmd.Parameters.AddWithValue("@p_name_de", prod.name_de);

                    cmd.Parameters.AddWithValue("@p_description_hu", prod.description_hu);
                    cmd.Parameters.AddWithValue("@p_description_en", prod.description_en);
                    cmd.Parameters.AddWithValue("@p_description_de", prod.description_de);

                    cmd.Parameters.AddWithValue("@p_manufacturer", prod.manufacturer);
                    cmd.Parameters.AddWithValue("@p_brand", prod.brand);
                    cmd.Parameters.AddWithValue("@p_rating", prod.rating);
                    cmd.Parameters.AddWithValue("@p_sku", prod.sku);
                    cmd.Parameters.AddWithValue("@p_active_ingredients", prod.active_ingredient);
                    cmd.Parameters.AddWithValue("@p_packaging", prod.packaging);
                    cmd.Parameters.AddWithValue("@p_created_at", prod.created_at);
                    cmd.Parameters.AddWithValue("@p_updated_at", prod.updated_at);



                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --model.shared.add_product");
                return 500;
            }
        }






















        public static int add_review(review rev)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("create_review", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("@p_product_id", rev.product_id);
                    cmd.Parameters.AddWithValue("@p_title", rev.title);
                    cmd.Parameters.AddWithValue("@p_body", rev.body);
                    cmd.Parameters.AddWithValue("@p_rating", rev.rating);


                    cmd.Parameters.AddWithValue("@p_user_id", rev.user_id);
                    

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --model.shared.add_review");
                return 500;
            }
        }

        public static int delete_all_reviews()
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_all_reviews", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --model.shared.delete_all_reviews");
                return 500;
            }
        }



















        public static int add_order(order ord)
        {




            try
            {
                using (MySqlCommand cmd = new MySqlCommand("create_order", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("@p_user_id", ord.user_id);
                    cmd.Parameters.AddWithValue("@p_city", ord.city);
                    cmd.Parameters.AddWithValue("@p_zipcode", ord.zipcode);
                    cmd.Parameters.AddWithValue("@p_price", ord.price);
                    cmd.Parameters.AddWithValue("@p_address", ord.address);
                    cmd.Parameters.AddWithValue("@p_apartment_number", ord.apartment_number);
                    cmd.Parameters.AddWithValue("@p_note", ord.note);
                    cmd.Parameters.AddWithValue("@p_house_number", ord.house_number);
                    cmd.Parameters.AddWithValue("@p_phone_number", ord.phone_number);


                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --model.shared.add_order");
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
                service.shared.log($"Error: {ex.Message} --model.shared.refresh_token 9");
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
                service.shared.log($"Error: {ex.Message} --model.shared.delete_all_users 10");
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
                service.shared.log($"Error: {ex.Message} --model.shared.delete_all_confirmations 11");
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
                service.shared.log($"Error: {ex.Message} --model.shared.delete_all_orders 12");
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
                service.shared.log($"Error: {ex.Message} --model.shared.delete_all_posts 13");
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
                service.shared.log($"Error: {ex.Message} --model.shared.delete_all_products 14");
                return 500;
            }
        }




    }
}
