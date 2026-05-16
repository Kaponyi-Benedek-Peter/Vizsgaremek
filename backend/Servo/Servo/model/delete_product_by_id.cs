using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class delete_product_by_id
    {


        public static int communicate_delete_product_by_id(string id)
        {
            MySqlConnection conn = null;
            service.shared.log(id);
            try
            {
                conn = new MySqlConnection(model.shared.connStr);
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("delete_product_by_id", conn))
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
