using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servo.model
{
    internal class get_all_post_categories
    {
        public static Dictionary<string, object> communicate_get_all_post_categories()
        {
            var result = new Dictionary<string, object>
            {
                { "statuscode", "200" },
                { "status", "success" },
                { "post_categories", new List<Dictionary<string, string>>() }
            };

            try
            {
                using (MySqlConnection conn = new MySqlConnection(model.shared.connStr))
                {
                    conn.Open();

                    using (MySqlCommand cmd = new MySqlCommand("get_all_post_categories", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        DataTable dt = new DataTable();
                        using (MySqlDataAdapter adapter = new MySqlDataAdapter(cmd))
                        {
                            adapter.Fill(dt);
                        }

                        var categories = (List<Dictionary<string, string>>)result["post_categories"];
                        /*	
id
name_hu
name_de
name_en
color
emoji

Módosítás Módosítás
Másolás Másolás
Törlés Törlés
1
hasd
dasd
easd
red
:)
*/
                        string[] fields = { "id", "name_hu", "name_de", "name_en", "color", "emoji" };

                        foreach (DataRow row in dt.Rows)
                        {
                            var category = new Dictionary<string, string>();
                            foreach (string field in fields)
                            {
                                category[field] = row.IsNull(field) ? "" : row[field].ToString();
                            }
                            categories.Add(category);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --model.get_all_post_categories.communicate_get_all_post_categories");
                result["statuscode"] = "500";
                result["status"] = "internal_error";
            }

            return result;
        }
    }
}
