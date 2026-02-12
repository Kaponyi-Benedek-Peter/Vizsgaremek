using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class delacc_promise
    {



        static string connStr = model.shared.connStr;
        static MySqlConnection conn = model.shared.conn;
        public static int communicate_delete_account(string id)
        {

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_account_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.delacc_promise.delete_account");
                return 500;
            }
        }




    }
}
