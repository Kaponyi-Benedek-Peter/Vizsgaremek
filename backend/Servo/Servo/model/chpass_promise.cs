using MySql.Data.MySqlClient;
using Org.BouncyCastle.Tls;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class chpass_promise
    {
    
         
        public static int change_password(string id, string new_passhash)
        {
MySqlConnection conn = null;
            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("update_password_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);
                    cmd.Parameters.AddWithValue("@p_new_passhash", new_passhash);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.chpass_promise.change_password");

                return 500;
            }
            finally
            {
                                if (conn != null)
                {
                    conn.Close();
                }
            }
        }



        public static int delete_confirmation(string id)
        {
            MySqlConnection conn = null;
            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("delete_confirmations_by_user_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_user_id", id);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 2: {ex.Message} --model.chpass_promise.delete_confirmation");
                return 500;
            }
            finally
            {
                if (conn != null)
                {
                    conn.Close();
                }
            }
        }



    }
}
