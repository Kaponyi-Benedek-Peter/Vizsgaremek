using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class get_all_product_images
    {
        public static string process_get_all_product_images()
        {

            //service.shared.log("Get all products change request: (" + ip+")");


            String resp = "";


            try//
            {
                string locatio = "./public/assets/products";

                List<object> products = new List<object>();

                foreach (string folder in Directory.GetDirectories(locatio))
                {
                    Dictionary<string, object> entry = new Dictionary<string, object>();
                    string folderName = Path.GetFileName(folder);
                    entry["name"] = folderName;

                    List<string> urls = new List<string>();
                    foreach (string file in Directory.GetFiles(folder))
                    {
                        string fileName = Path.GetFileName(file);
                        urls.Add("https://www.roysshack.hu/assets/products/" + folderName + "/" + fileName);
                    }

                    entry["files"] = urls;
                    products.Add(entry);
                }

                Dictionary<string, object> response = new Dictionary<string, object>();
                response["status"] = "success";
                response["statuscode"] = 200;
                response["images"] = products;

                resp = JsonConvert.SerializeObject(response, Formatting.Indented);
                
            }
            catch (Exception ex) { service.shared.log($"Error 1: {ex.Message} --service.get_all_product_categories.process_get_all_product_categories"); }


            /*try
            {

                recieved_token = resp["confirmation_token"];
                expirationdate = resp["confirmation_token_expire"];
                new_passhash = resp["new_value"];

            }
            catch (Exception ex) { service.shared.log($"Error: {ex.Message} --service.chpass_promise.process_chpass_promise 2"); }
            */



            //service.shared.log(controller_confirmation_token);
            //service.shared.log(fetched_token);



            //exchange rate

            if (resp=="")
            {
                shared.log($"Debug 1: <Unknown error> --service.get_all_product_images.process_get_all_product_imagess");
                return "error";
            }
            else
            {



                // if (van adat)
                {

                    //calculate exchange rate
                    return (resp);
                }



                return "error";


            }


        }
    }
}
