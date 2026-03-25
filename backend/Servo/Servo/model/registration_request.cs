using MySql.Data.MySqlClient;
using Org.BouncyCastle.Bcpg;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class registration_request
    {
        static string connStr = model.shared.connStr;
        static MySqlConnection conn = model.shared.conn;
        public static Boolean communicate_registration_request(model.shared.user usr)
        {
            MySqlConnection conn = null;
            Boolean ret = false;
            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("create_account", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_email", usr.email);
                    cmd.Parameters.AddWithValue("@p_sesstoken", usr.sesstoken);
                    cmd.Parameters.AddWithValue("@p_passhash", usr.passhash);
                    cmd.Parameters.AddWithValue("@p_sesstoken_expire", usr.sesstoken_expire);
                    cmd.Parameters.AddWithValue("@p_first_name", usr.first_name);
                    cmd.Parameters.AddWithValue("@p_last_name", usr.last_name);
                    cmd.Parameters.AddWithValue("@p_account_state", usr.p_account_state);
                    cmd.ExecuteNonQuery();

                    ret = true;
                }
               

            }
            catch (Exception ex)
            {
                service.shared.log("Error in registration_request: " + ex.Message);
                return false;
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }
            
            return ret;
        }


    }
}
