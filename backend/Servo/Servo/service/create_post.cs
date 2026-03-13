using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo.service
{
    internal class create_post
    {
        public static string registerhtml_top = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <title>Roy's Shack - Login Email</title>\r\n  <style>\r\n    body {\r\n      font-family: Arial, sans-serif;\r\n      margin: 0;\r\n      padding: 0;\r\n      background-color: #F5F0E1;\r\n      color: #333;\r\n      animation: fadeIn 1.2s ease;\r\n    }\r\n\r\n    .header {\r\n      background-color: #067A45;\r\n      color: white;\r\n      text-align: center;\r\n      padding: 40px 20px;\r\n      box-shadow: 0 4px 10px rgba(0,0,0,0.25);\r\n    }\r\n\r\n    .header img {\r\n      width: 70px;\r\n      height: 70px;\r\n      border-radius: 50%;\r\n      border: 3px solid #fff;\r\n      margin-bottom: 10px;\r\n    }\r\n\r\n    .header h1 {\r\n      margin: 0;\r\n      font-size: 28px;\r\n      letter-spacing: 1px;\r\n    }\r\n\r\n    .content {\r\n      padding: 50px 20px;\r\n      text-align: center;\r\n    }\r\n\r\n    .content h2 {\r\n      margin-top: 0;\r\n      font-size: 24px;\r\n      color: #067A45;\r\n    }\r\n\r\n    .content p {\r\n      font-size: 16px;\r\n      line-height: 1.6;\r\n      margin: 20px auto;\r\n      max-width: 600px;\r\n    }\r\n\r\n    .button {\r\n      display: inline-block;\r\n      background-color: #067A45;\r\n      color: #fff;\r\n      text-decoration: none;\r\n      padding: 16px 32px;\r\n      border-radius: 10px;\r\n      font-weight: bold;\r\n      font-size: 16px;\r\n      border: 3px solid #067A45;\r\n      transition: all 0.3s ease;\r\n      box-shadow: 0 4px 8px rgba(0,0,0,0.25);\r\n      margin-top: 20px;\r\n    }\r\n\r\n    .button:hover {\r\n      background-color: #fff;\r\n      color: #067A45;\r\n      transform: scale(1.05);\r\n    }\r\n\r\n    .footer {\r\n      background-color: #fff;\r\n      text-align: center;\r\n      font-size: 13px;\r\n      color: #555;\r\n      padding: 20px;\r\n      border-top: 3px solid #067A45;\r\n      box-shadow: 0 -3px 8px rgba(0,0,0,0.1);\r\n    }\r\n\r\n    @keyframes fadeIn {\r\n      from { opacity: 0; transform: translateY(15px); }\r\n      to { opacity: 1; transform: translateY(0); }\r\n    }\r\n\r\n    html{background-color: white;}\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"header\">\r\n    <img src=\"http://localhost:90/a.gif\" alt=\"Logo\">\r\n    <h1>Roy's Shack</h1>\r\n  </div>\r\n\r\n  <div class=\"content\">\r\n    <h2>Welcome Back!</h2>\r\n    <p>\r\n      Hello there,<br>\r\n      We received a request to log in to your Roy's Shack account.<br>\r\n      Click the button below to securely sign in:\r\n    </p>\r\n\r\n    <a href=\"";
        public static string registerhtml_bottom = "\" class=\"button\">Log In</a>\r\n\r\n    <p>If you didn’t request this login, you can safely ignore this email.</p>\r\n  </div>\r\n\r\n  <div class=\"footer\">\r\n    © 2025 Roy's Shack. All rights reserved.<br>\r\n    This is an automated message, please do not reply.\r\n  </div>\r\n</body>\r\n</html>\r\n";



        //Teljes szövegek

        public static int process_create_post(string controller_user_id, string controller_session_token, string name_de, string description_en, string price_huf,
            string times_ordered, string stock, string sale_percentage, string description_preview_en, string name_hu,
            string name_en, string description_hu, string description_de, string description_preview_hu,
            string description_preview_de, string category_id, string manufacturer, string brand,
            string rating, string sku, string active_ingredients,
            string packaging_en, string packaging_hu, string packaging_de, string created_at,
            string updated_at, string thumbnail_url, string featured)
        {
            try
            {
                service.shared.log("Create product request: " + name_en);

                string model_session_token = model.shared.get_token_by_id(controller_user_id);
                string accstate = model.shared.get_account_state_by_id(controller_user_id);
                //MessageBox.Show(accstate);
                if (model_session_token != controller_session_token)
                {
                    return 401;
                }
                else
                {


                    model.shared.product prod;

                    if (accstate == "admin" || accstate == "superadmin")
                    {


                        /*
      id   name_de  description_en  price_huf
times_ordered  stock  sale_percentage  description_preview_en  name_hu  name_en 
      description_hu  description_de  description_preview_hu  description_preview_de
category_id  manufacturer  brand  rating  sku  active_ingredients  packaging_en
packaging_hu  packaging_de  created_at  updated_at  name  thumbnail_url  featured*/
                        try
                        {
                            prod = new model.shared.product
                            {

                                name_de = name_de,
                                description_en = description_en,
                                price = Convert.ToInt32(price_huf),
                                times_ordered = Convert.ToInt32(times_ordered),
                                stock = Convert.ToInt32(stock),
                                sale_percentage = Convert.ToInt32(sale_percentage),
                                description_preview_en = description_preview_en,
                                name_hu = name_hu,
                                name_en = name_en,
                                description_hu = description_hu,
                                description_de = description_de,
                                description_preview_hu = description_preview_hu,
                                description_preview_de = description_preview_de,
                                category_id = category_id,
                                manufacturer = manufacturer,
                                brand = brand,
                                rating = Convert.ToDouble(rating),
                                sku = sku,
                                active_ingredient = active_ingredients,
                                packaging_en = packaging_en,
                                packaging_hu = packaging_hu,
                                packaging_de = packaging_de,
                                created_at = "",
                                updated_at = "",
                                featured = featured,

                                thumbnail_url = ""


                            };
                        }
                        catch (Exception ex)
                        {

                            return 400;
                        }


                        int result = model.shared.add_product(prod);

                        if (result == 200)
                        {

                            return 200;
                        }
                        else
                        {
                            return 500;
                        }

                    }

                    else
                    {

                        return 403;
                    }

                }
            }
            catch (Exception ex)
            {
                service.shared.log($"Error 1: {ex.Message} --service.create_post.process_create_post");
                return 400;
            }
        }






    }
}
