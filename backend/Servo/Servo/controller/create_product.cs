using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Servo.controller
{
    internal class create_product
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string controller_user_id = "";
            string controller_session_token = "";

            string name_de = "";
            string description_en = "";
            string price_huf = "";
            string times_ordered = "";
            string stock = "";
            string sale_percentage = "";
            string description_preview_en = "";
            string name_hu = "";
            string name_en = "";
            string description_hu = "";
            string description_de = "";
            string description_preview_hu = "";
            string description_preview_de = "";
            string category_id = "";
            string manufacturer = "";
            string brand = "";
            string rating = "";
            string sku = "";
            string active_ingredients = "";
            string packaging_en = "";
            string packaging_hu = "";
            string packaging_de = "";
            string created_at = "";
            string thumbnail_url = "";
            string featured = "";

            try
            {
                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");

                try
                {
                    JObject jsonObj = JObject.Parse(lenyeg);

                    controller_user_id = service.shared.b64dec(jsonObj["user_id"].ToString());
                    controller_session_token = service.shared.b64dec(jsonObj["session_token"].ToString());

                    name_de = service.shared.b64dec(jsonObj["name_de"].ToString());
                    description_en = service.shared.b64dec(jsonObj["description_en"].ToString());
                    price_huf = service.shared.b64dec(jsonObj["price_huf"].ToString());
                    times_ordered = service.shared.b64dec(jsonObj["times_ordered"].ToString());
                    stock = service.shared.b64dec(jsonObj["stock"].ToString());
                    sale_percentage = service.shared.b64dec(jsonObj["sale_percentage"].ToString());
                    description_preview_en = service.shared.b64dec(jsonObj["description_preview_en"].ToString());
                    name_hu = service.shared.b64dec(jsonObj["name_hu"].ToString());
                    name_en = service.shared.b64dec(jsonObj["name_en"].ToString());
                    description_hu = service.shared.b64dec(jsonObj["description_hu"].ToString());
                    description_de = service.shared.b64dec(jsonObj["description_de"].ToString());
                    description_preview_hu = service.shared.b64dec(jsonObj["description_preview_hu"].ToString());
                    description_preview_de = service.shared.b64dec(jsonObj["description_preview_de"].ToString());
                    category_id = service.shared.b64dec(jsonObj["category_id"].ToString());
                    manufacturer = service.shared.b64dec(jsonObj["manufacturer"].ToString());
                    brand = service.shared.b64dec(jsonObj["brand"].ToString());
                    rating = service.shared.b64dec(jsonObj["rating"].ToString());
                    sku = service.shared.b64dec(jsonObj["sku"].ToString());
                    active_ingredients = service.shared.b64dec(jsonObj["active_ingredients"].ToString());
                    packaging_en = service.shared.b64dec(jsonObj["packaging_en"].ToString());
                    packaging_hu = service.shared.b64dec(jsonObj["packaging_hu"].ToString());
                    packaging_de = service.shared.b64dec(jsonObj["packaging_de"].ToString());
                   
                    

                    featured = service.shared.b64dec(jsonObj["featured"].ToString());
                }
                catch
                {
                    var respon_2 = new
                    {
                        status = "malformed_request",
                        statuscode = "400"
                    };

                    string jsonrespon = JsonSerializer.Serialize(respon_2);

                    data.Response.StatusCode = 400;
                    byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    return;
                }

                service.shared.log("Create product request: " + name_en);

                int resp = service.create_product.process_create_product(
                    controller_user_id,
                    controller_session_token,
                    name_de,
                    description_en,
                    price_huf,
                    times_ordered,
                    stock,
                    sale_percentage,
                    description_preview_en,
                    name_hu,
                    name_en,
                    description_hu,
                    description_de,
                    description_preview_hu,
                    description_preview_de,
                    category_id,
                    manufacturer,
                    brand,
                    rating,
                    sku,
                    active_ingredients,
                    packaging_en,
                    packaging_hu,
                    packaging_de,
                    "", // created_at
                    "", // updated_at
                    "", // thumbnail_url
                    featured
                );

                if (resp == 200)
                {
                    var respon = new
                    {
                        status = "success",
                        statuscode = "200"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 200;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp == 400)
                    {
                        var respon = new
                        {
                            status = "success",
                            statuscode = "400"
                        };
                        string jsonresponse = JsonSerializer.Serialize(respon);

                        data.Response.StatusCode = 400;
                        byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                        data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp == 403)
                {
                    var respon = new
                    {
                        status = "permission_denied",
                        statuscode = "403"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 403;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp == 500)
                {
                    var respon = new
                    {
                        status = "internal_error",
                        statuscode = "500"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 500;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp == 401)
                {
                    var respon = new
                    {
                        status = "incorrect_credentials",
                        statuscode = "401"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 401;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }



            }
            catch (Exception ex)
            {
                service.shared.log($"Error: {ex.Message} --controller.create_product");

                var respon = new
                {
                    status = "internal_error",
                    statuscode = "500"
                };

                string jsonrespon = JsonSerializer.Serialize(respon);

                data.Response.StatusCode = 500;
                byte[] buffer = Encoding.UTF8.GetBytes(jsonrespon);
                data.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
        }
    }
}