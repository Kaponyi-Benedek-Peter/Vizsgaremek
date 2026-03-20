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
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.model
{
    internal class shared
    {

        public class confirmation
        {


            public string confirmation_token { get; set; } = "";
            public string user_id { get; set; } = "";
            public string value { get; set; } = "";
            public string confirmation_type { get; set; } = "";

        }



        public class post
        {

            /*
Teljes szövegek
id
title
content
user_id
created_at
image_url
category_id
updated_at
slug
excerpt
status
views
likes
comment_count
is_featured
published_at
last_activity_at
tags
*/
            public int id { get; set; } = 0;
            public string title { get; set; } = "";
            public string content { get; set; } = "";
            public int user_id { get; set; } = 0;
            public string created_at { get; set; } = "";
            public string image_url { get; set; } = "";
            public string category_id { get; set; } = "";
            public string updated_at { get; set; } = "";
            public string slug { get; set; } = "";
            public string excerpt { get; set; } = "";
            public string status { get; set; } = "";
            public int views { get; set; } = 0;
            public int likes { get; set; } = 0;
            public int comment_count { get; set; } = 0;
            public int is_featured { get; set; } = 0;
            public string published_at { get; set; } = "";
            public string last_activity_at { get; set; } = "";
            public string tags { get; set; } = "";

        }



        public class category
        {


            public string category_name_en { get; set; } = "";

            public string category_name_de { get; set; } = "";

            public string category_name_hu { get; set; } = "";

            public string color { get; set; } = "";
            public string emoji { get; set; } = "";
            public int number_of_products { get; set; } = 0;

        }


        public class newsletter_recipient
        {


            public string email { get; set; } = "";
            public string news_level { get; set; } = "";
            public string received_current_newsletter { get; set; } = "";
            public string language { get; set; } = "";

            public string id { get; set; } = "";

        }


        public class order
        {//	id	user_id	email	billing_name	shipping_name	tracking	token	guest	order_status	shipping_company	confirmed	confirmed_at	created_at	price	city	zipcode	address	apartment_number	note	house_number	phone_number	
            public string user_id { get; set; } = "";
            public string email { get; set; } = "";

            public string billing_name { get; set; } = "";
            public string shipping_name { get; set; } = "";
            public string tracking_token { get; set; } = "";

            public string guest { get; set; } = "";

            public string order_status { get; set; } = "";
            public string shipping_company { get; set; } = "";
            public string confirmed { get; set; } = "";

          





            public string city { get; set; } = "";
            public string zipcode { get; set; } = "";
            public string price { get; set; } = "";
            public string address { get; set; } = "";
            public string apartment_number { get; set; } = "";
            public string note { get; set; } = "";
            public string house_number { get; set; } = "";
            public string phone_number { get; set; } = "";

        }


        public class order_item
        {
            public string product_id { get; set; } = "";
            public string quantity { get; set; } = "";

            public string order_id { get; set; }

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

            public string category_id { get; set; } = "";
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
            public string thumbnail_url { get; set; } = "";

            public string featured { get; set; } = "";
            public string packaging_en { get; set; } = "";
            public string packaging_de { get; set; } = "";
            public string packaging_hu { get; set; } = "";


        }


        public class review
        {
            public string product_id { get; set; } = "";
            public string title { get; set; } = "";
            public string body { get; set; } = "";
            public string rating { get; set; } = "";
            public int created_at { get; set; } = 0;
            public int user_id { get; set; } = 0;

        }

        public class product_image
        {
            public string alt_text_hu { get; set; } = "";
            public string alt_text_en { get; set; } = "";
            public string alt_text_de { get; set; } = "";
            public string image_url { get; set; } = "";
            public int sort_id { get; set; } = 0;
            public int product_id { get; set; } = 0;
        }



        public static void init(string databasename)
        {
            connStr = $"server={service.shared.conf("r", "sql_conn_server")};port={service.shared.conf("r", "sql_conn_port")};user={service.shared.conf("r", "sql_conn_user")};password={service.shared.conf("r", "sql_conn_password")};database={databasename};";
           
            
            service.shared.log("[mysql connection open]");

        }

        public static (MySqlConnection,string) newconn()
        {
            MySqlConnection tempconn;
            tempconn = new MySqlConnection(connStr);
            try
            {
                
                tempconn.Open();

                return (tempconn,"ok");

            }
            catch (Exception ex) { 
                
                service.shared.log("Start the MySql server! || " + ex.Message);
                return(tempconn, "error");

            }
        }

        public static string connStr;

        public static MySqlConnection conn
        {
            get
            {
                var c = new MySqlConnection(connStr);
                c.Open();
                return c;
            }
        }
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


                string toreturn = null;

                using (MySqlCommand cmd = new MySqlCommand("get_user_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            toreturn = reader["email"]?.ToString();
                        }
                    }
                }

                if (toreturn != null)
                    return toreturn;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_email_by_id");
                return "500";
            }

        }


        public static (string firstname,string lastname) get_name_by_id(string id)
        {
            try
            {


                
                string firstname = null;
                string lastname= null;


                using (MySqlCommand cmd = new MySqlCommand("get_user_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            lastname = reader["last_name"]?.ToString();
                            firstname = reader["first_name"]?.ToString();

                        }
                    }
                }

                (string firstname, string lastname) toreturn;
                toreturn.firstname = firstname;
                toreturn.lastname = lastname;

                if (toreturn != (null,null))
                    return toreturn;
                else
                    return ("404","404");
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_email_by_id");
                return ("404","404");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_token_by_id");
                return "500";
            }

        }


        public static Dictionary<string, string> get_full_confirmation_by_user_id(string user_id, string type)
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
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_full_confirmation_by_user_id");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_account_state_by_id");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_passhash_by_id");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_sesstoken_expiration_by_id");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_id_by_email");
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
                    cmd.Parameters.AddWithValue("@p_type", con.confirmation_type);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_confirmation");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_confirmations_by_user_id_and_type");
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


                    cmd.Parameters.AddWithValue("@p_category_id", prod.category_id);

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



                    cmd.Parameters.AddWithValue("@p_packaging_de", prod.packaging_de);
                    cmd.Parameters.AddWithValue("@p_packaging_en", prod.packaging_de);
                    cmd.Parameters.AddWithValue("@p_packaging_hu", prod.packaging_de);


                    cmd.Parameters.AddWithValue("@p_created_at", prod.created_at);
                    cmd.Parameters.AddWithValue("@p_updated_at", prod.updated_at);
                    cmd.Parameters.AddWithValue("@p_thumbnail_url", prod.thumbnail_url);

                    cmd.Parameters.AddWithValue("@p_featured", prod.featured);



                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_product");
                return 500;
            }
        }




        public static int update_product(product prod,int id)
        {

            try
            {//id name_de description_en price_huf times_ordered stock sale_percentage description_preview_en name_hu
             //name_en description_hu description_de description_preview_hu description_preview_de
             //category manufacturer brand rating sku active_ingredients packaging created_at updated_at name
                using (MySqlCommand cmd = new MySqlCommand("update_product_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", prod.price);



                    cmd.Parameters.AddWithValue("@p_price_huf", prod.price);
                    cmd.Parameters.AddWithValue("@p_times_ordered", prod.times_ordered);
                    cmd.Parameters.AddWithValue("@p_stock", prod.stock);
                    cmd.Parameters.AddWithValue("@p_sale_percentage", prod.sale_percentage);


                    cmd.Parameters.AddWithValue("@p_description_preview_hu", prod.description_preview_hu);
                    cmd.Parameters.AddWithValue("@p_description_preview_en", prod.description_preview_en);
                    cmd.Parameters.AddWithValue("@p_description_preview_de", prod.description_preview_en);


                    cmd.Parameters.AddWithValue("@p_category_id", prod.category_id);

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



                    cmd.Parameters.AddWithValue("@p_packaging_de", prod.packaging_de);
                    cmd.Parameters.AddWithValue("@p_packaging_en", prod.packaging_de);
                    cmd.Parameters.AddWithValue("@p_packaging_hu", prod.packaging_de);


                    cmd.Parameters.AddWithValue("@p_created_at", prod.created_at);
                    cmd.Parameters.AddWithValue("@p_updated_at", prod.updated_at);
                    cmd.Parameters.AddWithValue("@p_thumbnail_url", prod.thumbnail_url);

                    cmd.Parameters.AddWithValue("@p_featured", prod.featured);



                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.update_product_by_id");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_review");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_all_reviews");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.refresh_token");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_all_users");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_all_confirmations");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_all_orders");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_all_posts");
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
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_all_products");
                return 500;
            }
        }









































        public static int add_product_image(product_image img)
        {




            try
            {
                using (MySqlCommand cmd = new MySqlCommand("create_product_image", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    /*
                     	p_alt_text_de,
                        p_alt_text_en,
                        p_alt_text_hu,
                        p_image_url,
                        p_sort_id,
                        p_product_id
                     */

                    cmd.Parameters.AddWithValue("@p_alt_text_de", img.alt_text_de);
                    cmd.Parameters.AddWithValue("@p_alt_text_en", img.alt_text_en);
                    cmd.Parameters.AddWithValue("@p_alt_text_hu", img.alt_text_hu);
                    cmd.Parameters.AddWithValue("@p_image_url", img.image_url);
                    cmd.Parameters.AddWithValue("@p_sort_id", img.sort_id);
                    cmd.Parameters.AddWithValue("@p_product_id", img.product_id);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_product_image");
                return 500;
            }
        }






        public static int add_newsletter_recipient(newsletter_recipient recip)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("create_newsletter_recipient", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    service.shared.log($"Adding newsletter recipient: email={recip.email}, news_level={recip.news_level}");

                    cmd.Parameters.AddWithValue("@p_email", recip.email);
                    cmd.Parameters.AddWithValue("@p_news_level", recip.news_level);
                    cmd.Parameters.AddWithValue("@p_language", recip.language);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_newsletter_recipient");
                if(ex.Message.Contains("Duplicate"))
                {
                    service.shared.log("Duplicate entry detected");
                    return 409;
                }
                return 500;
            }
        }





        //increment_post_views_by_id
        public static int increment_post_views_by_id(string id)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("increment_post_view_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                   
                    cmd.Parameters.AddWithValue("@p_id", id);
                  
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_newsletter_recipient");
                if (ex.Message.Contains("Duplicate"))
                {
                    service.shared.log("Duplicate entry detected");
                    return 409;
                }
                return 500;
            }
        }








        public static int add_category(category cat)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("create_product_category", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_category_hu", cat.category_name_hu);
                    cmd.Parameters.AddWithValue("@p_category_en", cat.category_name_en);
                    cmd.Parameters.AddWithValue("@p_category_de", cat.category_name_de);

                    cmd.Parameters.AddWithValue("@p_emoji", cat.emoji);
                    cmd.Parameters.AddWithValue("@p_number_of_products", cat.number_of_products);
                    cmd.Parameters.AddWithValue("@p_color", cat.color);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_category");
                return 500;
            }
        }



        public static int update_name_by_id(string user_id, string new_firstname, string new_lastname)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("update_name_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", user_id);
                    cmd.Parameters.AddWithValue("@p_new_last_name", new_lastname);
                    cmd.Parameters.AddWithValue("@p_new_first_name", new_firstname);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.update_name_by_id");
                return 500;
            }
        }

        public static int update_password_by_id(string user_id, string new_firstname, string new_lastname)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("update_password_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", user_id);
                    cmd.Parameters.AddWithValue("@p_new_passhash", new_lastname);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.update_password_by_id");
                return 500;
            }
        }


        public static int update_account_state_by_id(string user_id, string new_state)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("update_account_state_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", user_id);
                    cmd.Parameters.AddWithValue("@p_new_account_state", new_state);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.update_name_by_id");
                return 500;
            }
        }



        public static int update_ban_reason_by_id(string user_id, string ban_reason)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("update_ban_reason_by_user_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_user_id", user_id);
                    cmd.Parameters.AddWithValue("@p_ban_reason", ban_reason);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.update_ban_reason_by_id");
                return 500;
            }
        }





        //update_product_stock_by_id



        public static int update_product_stock_by_id(string product_id, string new_stock_count)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("update_product_stock_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", product_id);
                    cmd.Parameters.AddWithValue("@p_new_stock", new_stock_count);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.update_product_stock_by_id");
                return 500;
            }








        }








        

        public static int add_post(post pos)
        {

            try
            {//id name_de description_en price_huf times_ordered stock sale_percentage description_preview_en name_hu
             //name_en description_hu description_de description_preview_hu description_preview_de
             //category manufacturer brand rating sku active_ingredients packaging created_at updated_at name
                using (MySqlCommand cmd = new MySqlCommand("create_post", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;



                    cmd.Parameters.AddWithValue("@p_title", pos.title);
                    cmd.Parameters.AddWithValue("@p_content", pos.content);
                    cmd.Parameters.AddWithValue("@p_user_id", pos.user_id);
                    cmd.Parameters.AddWithValue("@p_image_url", pos.image_url);
                    cmd.Parameters.AddWithValue("@p_category_id", pos.category_id);
 cmd.Parameters.AddWithValue("@p_slug", pos.slug);
cmd.Parameters.AddWithValue("@p_excerpt", pos.excerpt);
                    cmd.Parameters.AddWithValue("@p_status", pos.status);
                    cmd.Parameters.AddWithValue("@p_views", pos.views);
                    cmd.Parameters.AddWithValue("@p_likes", pos.likes);
cmd.Parameters.AddWithValue("@p_comment_count", pos.comment_count);
                    cmd.Parameters.AddWithValue("@p_is_featured", pos.is_featured);
                    cmd.Parameters.AddWithValue("@p_tags", pos.tags);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_post");
                return 500;
            }
        }




        public static (int,string) add_order(order ord)
        {
            string toreturn = "error";
            try
            {
                using (MySqlCommand cmd = new MySqlCommand("create_order", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    //id user_id email billing_name    shipping_name tracking
                    //token guest   order_status shipping_company    confirmed confirmed_at
                    //created_at price   city zipcode address apartment_number    note house_number
                    //phone_number

                    service.shared.log($"Adding order for user_id: {ord.user_id}, email: {ord.email}, city: {ord.city}, company: {ord.shipping_company}");

                    cmd.Parameters.AddWithValue("@p_user_id", ord.user_id);
                    cmd.Parameters.AddWithValue("@p_city", ord.city);

                    cmd.Parameters.AddWithValue("@p_zipcode", ord.zipcode);

                    cmd.Parameters.AddWithValue("@p_guest", ord.guest);
                    cmd.Parameters.AddWithValue("@p_address", ord.address);

                    cmd.Parameters.AddWithValue("@p_email", ord.email);
                    cmd.Parameters.AddWithValue("@p_billing_name", ord.billing_name);
                    cmd.Parameters.AddWithValue("@p_shipping_name", ord.shipping_name);
                    cmd.Parameters.AddWithValue("@p_tracking_token", ord.tracking_token);
                    cmd.Parameters.AddWithValue("@p_order_status", ord.order_status);
                    cmd.Parameters.AddWithValue("@p_shipping_company", ord.shipping_company);
                    cmd.Parameters.AddWithValue("@p_confirmed", ord.confirmed);
                    cmd.Parameters.AddWithValue("@p_price", ord.price);
                    cmd.Parameters.AddWithValue("@p_apartment_number", ord.apartment_number);
                    cmd.Parameters.AddWithValue("@p_note", ord.note);
                    cmd.Parameters.AddWithValue("@p_house_number", ord.house_number);
                    cmd.Parameters.AddWithValue("@p_phone_number", ord.phone_number);


                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            toreturn = reader["id"]?.ToString();
                        }
                    }


                    return (200,toreturn);
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_order");
                return (500,"error");
            }
        }










        public static int update_post_by_id(post pos, string id)
        {

            try
            {//id name_de description_en price_huf times_ordered stock sale_percentage description_preview_en name_hu
             //name_en description_hu description_de description_preview_hu description_preview_de
             //category manufacturer brand rating sku active_ingredients packaging created_at updated_at name
                using (MySqlCommand cmd = new MySqlCommand("update_post_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;



                    cmd.Parameters.AddWithValue("@p_id", id);
                    cmd.Parameters.AddWithValue("@p_title", pos.title);
                    cmd.Parameters.AddWithValue("@p_content", pos.content);
                    cmd.Parameters.AddWithValue("@p_user_id", pos.user_id);
                    cmd.Parameters.AddWithValue("@p_image_url", pos.image_url);
                    cmd.Parameters.AddWithValue("@p_category_id", pos.category_id);
                    cmd.Parameters.AddWithValue("@p_slug", pos.slug);
                    cmd.Parameters.AddWithValue("@p_excerpt", pos.excerpt);
                    cmd.Parameters.AddWithValue("@p_status", pos.status);
                    cmd.Parameters.AddWithValue("@p_views", pos.views);
                    cmd.Parameters.AddWithValue("@p_likes", pos.likes);
                    cmd.Parameters.AddWithValue("@p_comment_count", pos.comment_count);
                    cmd.Parameters.AddWithValue("@p_is_featured", pos.is_featured);
                    cmd.Parameters.AddWithValue("@p_tags", pos.tags);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.update_post_by_id");
                return 500;
            }
        }


        public static int create_post_comment_by_post_id(string post_id, string user_id, string content)
        {

            try
            {//id name_de description_en price_huf times_ordered stock sale_percentage description_preview_en name_hu
             //name_en description_hu description_de description_preview_hu description_preview_de
             //category manufacturer brand rating sku active_ingredients packaging created_at updated_at name
                using (MySqlCommand cmd = new MySqlCommand("create_post_comment_by_post_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;



                    cmd.Parameters.AddWithValue("@p_post_id", post_id);
                    cmd.Parameters.AddWithValue("@p_user_id", user_id);
                    cmd.Parameters.AddWithValue("@p_content", content);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.create_post_comment_by_post_id");
                return 500;
            }
        }



        public static int update_post_comment_by_comment_id(string comment_id, string content)
        {

            try
            {
             
                using (MySqlCommand cmd = new MySqlCommand("update_post_comment_by_comment_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    service.shared.log($"Updating comment_id: {comment_id} with new content: {content}");

                    cmd.Parameters.AddWithValue("@p_comment_id", comment_id);
                    cmd.Parameters.AddWithValue("@p_content", content);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.update_post_comment_by_comment_id");
                return 500;
            }
        }


        public static int delete_post_comments_by_id(string post_id)
        {

            try
            {//id name_de description_en price_huf times_ordered stock sale_percentage description_preview_en name_hu
             //name_en description_hu description_de description_preview_hu description_preview_de
             //category manufacturer brand rating sku active_ingredients packaging created_at updated_at name
                using (MySqlCommand cmd = new MySqlCommand("delete_post_comment_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;



                    cmd.Parameters.AddWithValue("@p_post_id", post_id);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_post_comment_by_id");
                return 500;
            }
        }


        public static int delete_post_comments_by_post_id(string post_id)
        {

            try
            {//id name_de description_en price_huf times_ordered stock sale_percentage description_preview_en name_hu
             //name_en description_hu description_de description_preview_hu description_preview_de
             //category manufacturer brand rating sku active_ingredients packaging created_at updated_at name
                
                service.shared.log($"Deleting comments for post_id: {post_id}");

                using (MySqlCommand cmd = new MySqlCommand("delete_post_comment_by_post_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;



                    cmd.Parameters.AddWithValue("@p_post_id", post_id);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_post_comments_by_id");
                return 500;
            }
        }



        public static int delete_post_comment_by_comment_id(string comment_id)
        {

            try
            {//id name_de description_en price_huf times_ordered stock sale_percentage description_preview_en name_hu
             //name_en description_hu description_de description_preview_hu description_preview_de
             //category manufacturer brand rating sku active_ingredients packaging created_at updated_at name
                using (MySqlCommand cmd = new MySqlCommand("delete_post_comment_by_comment_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;



                    cmd.Parameters.AddWithValue("@p_id", comment_id);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_post_comment_by_comment_id");
                return 500;
            }
        }


        // 

        //get_user_id_by_post_comment_id;



        public static string get_user_id_by_post_comment_id(string id)
        {
            try
            {


                string toreturn = null;

                using (MySqlCommand cmd = new MySqlCommand("get_user_id_by_post_comment_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_post_comment_id", id);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            toreturn = reader["user_id"]?.ToString();
                        }
                    }
                }

                if (toreturn != null)
                    return toreturn;
                else
                    return "404";
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.get_email_by_id");
                return "500";
            }

        }











        public static int delete_all_post_comments()
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_all_post_comments", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.delete_all_post_comments");
                return 500;
            }
        }


        public static int add_order_item(order_item ord)
        {

            try
            {//	id	order_id	product_id	quantity	price	unit_price	product_name_hu
             //		product_name_en	product_name_de	thumbnail_url	sku	
                using (MySqlCommand cmd = new MySqlCommand("create_order_item", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    //p_order_id, p_product_id, p_quantity

                    cmd.Parameters.AddWithValue("@p_product_id", ord.product_id);
                    cmd.Parameters.AddWithValue("@p_quantity", ord.quantity);
                    cmd.Parameters.AddWithValue("@p_order_id", ord.order_id);

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.shared.add_post");
                return 500;
            }
        }




































































































































        //Duplicate 

    }
}
