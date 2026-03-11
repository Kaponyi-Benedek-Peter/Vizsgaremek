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
    internal class delete_post_by_id
    {
        static string connStr = model.shared.connStr;
        static MySqlConnection conn = model.shared.conn;
        public static int communicate_delete_post_by_id(string id)
        {
            service.shared.log(id);
            try
            {
                using (MySqlCommand cmd = new MySqlCommand("delete_post_by_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@p_id", id);
                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.delete_post_by_id.communicate_get_post_by_id");

                return 500;
            }
        }



     


    }
}
