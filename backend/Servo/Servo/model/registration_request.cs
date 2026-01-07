using MySql.Data.MySqlClient;
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
        public static Boolean ExecuteRequest(Dictionary<string, string> lista = null)
        {
            Boolean ret = false;
            using (MySqlCommand cmd = new MySqlCommand("create_account", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@p_email", lista["p_email"]);
                cmd.Parameters.AddWithValue("@p_sesstoken", lista["p_sesstoken"]);
                cmd.Parameters.AddWithValue("@p_passhash", lista["p_passhash"]);
                cmd.Parameters.AddWithValue("@p_sesstoken_expire", lista["p_sesstoken_expire"]);
                cmd.Parameters.AddWithValue("@p_first_name", lista["p_first_name"]);
                cmd.Parameters.AddWithValue("@p_last_name", lista["p_last_name"]);
                cmd.Parameters.AddWithValue("@p_account_state", lista["p_account_state"]);
                cmd.ExecuteNonQuery();

                ret = true;
            }
            return ret;
        }
    }
}
