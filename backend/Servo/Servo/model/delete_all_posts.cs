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
    internal class delete_all_posts
    {

        
        public static int communicate_delete_all_posts()
        {MySqlConnection conn = null;
            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("delete_all_posts", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();

                    return 200;
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.delete_all_posts.communicate_delete_all_posts");

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
