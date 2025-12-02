using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class registration_promise
    {
        public static int main(string service_id) {

            try
            {

                Dictionary<string, string> lista = new Dictionary<string, string>
               {
                { "p_new_account_state", "verified" },
                { "p_id", service_id }
               };

                //string result = model.shared.fetchsqlsing("update_account_state_by_email", null, null, null, "users", null, lista);


                string connStr = model.shared.connStr;
                MySqlConnection conn = model.shared.conn;

                
                using (MySqlCommand cmd = new MySqlCommand("update_account_state_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_new_account_state", lista["p_new_account_state"]);
                    cmd.Parameters.AddWithValue("@p_id", lista["p_id"]);
                    cmd.ExecuteNonQuery();
                }



                return 200;
            }
            catch (Exception ex) {
                service.shared.log(ex.Message + " -registration_promise.main");
                return 500;
                
            }

        }
    }
}
