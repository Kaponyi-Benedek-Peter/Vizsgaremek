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
        static string connStr = model.shared.connStr;
        static MySqlConnection conn = model.shared.conn;
        public static int change_password(string id, string new_passhash)
        {

            try
            {
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
                service.shared.log($"Error: {ex.Message} --model.chpass_promise.change_password 1");

                return 500;
            }
        }



        public static int delete_confirmation(string id)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_confirmation_by_user_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_user_id", id);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --model.chpass_promise.delete_confirmation 2");
                return 500;
            }
        }



    }
}
