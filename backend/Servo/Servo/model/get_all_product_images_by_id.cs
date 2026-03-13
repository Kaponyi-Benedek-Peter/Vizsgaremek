using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace Servo.model
{
    internal class get_all_product_images_by_id
    {

        static MySqlConnection conn = model.shared.conn;





        public static Dictionary<string, object> communicate_get_all_product_images_by_id(string product_id)
        {
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "images", new List<Dictionary<string, string>>() }
            };

            try
            {
                using (MySqlCommand cmd = new MySqlCommand("get_all_product_images_by_product_id", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_product_id", product_id);


                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var images = (List<Dictionary<string, string>>)result["images"];

                        while (reader.Read())
                        {


                            var image = new Dictionary<string, string>();

                            /*	
Teljes szövegek
id
alt_text_de
alt_text_hu
alt_text_en
image_url
product_id
sort_id													*/
                            string[] fields = { "id","alt_text_de","alt_text_hu", "alt_text_en", "image_url", "product_id", "sort_id"
                                      };

                            foreach (string field in fields)
                            {
                                image[field] = reader.IsDBNull(reader.GetOrdinal(field)) ? "" : reader[field].ToString();
                            }

                            images.Add(image);
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_product_images_by_id.communicate_get_all_product_images_by_id");
                result["statuscode"] = "500";
                result["status"] = "internal_error";

            }

            return result;
        }





    }
}
