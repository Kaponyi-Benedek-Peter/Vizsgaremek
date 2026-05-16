using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Servo.controller
{
    internal class create_order
    {
        public static void main(HttpListenerContext data, string lenyeg)
        {
            string controller_user_id;
            string controller_session_token;
            string created_at;
            string email;
            string billing_name;
            string shipping_name;
            string shipping_company;
            string price;
            string city;
            string guest;
             string zipcode;
            string address;
            string apartment_number;
            string note;
            string house_number;
            string phone_number;
            


            try
            {
                using (StreamReader reader = new StreamReader(data.Request.InputStream, data.Request.ContentEncoding))
                {
                    lenyeg = reader.ReadToEnd();
                }

                service.shared.log($"Body received: {lenyeg}");
                List<model.shared.order_item> items_list = new List<model.shared.order_item>();
                try
                {
                    JObject jsonObj = JObject.Parse(lenyeg);

                    JObject order = (JObject)jsonObj["order"];

                    controller_user_id = service.shared.b64dec(order["user_id"].ToString());
                    controller_session_token = service.shared.b64dec(order["session_token"].ToString());
                    email = service.shared.b64dec(order["email"].ToString());
                    billing_name = service.shared.b64dec(order["billing_name"].ToString());
                    shipping_name = service.shared.b64dec(order["shipping_name"].ToString());
                    shipping_company = service.shared.b64dec(order["shipping_company"].ToString());
                    price = service.shared.b64dec(order["price"].ToString());
                    city = service.shared.b64dec(order["city"].ToString());
                    guest = service.shared.b64dec(order["guest"].ToString());
                    zipcode = service.shared.b64dec(order["zipcode"].ToString());
                    address = service.shared.b64dec(order["address"].ToString());
                    apartment_number = service.shared.b64dec(order["apartment_number"].ToString());
                    note = service.shared.b64dec(order["note"].ToString());
                    house_number = service.shared.b64dec(order["house_number"].ToString());
                    phone_number = service.shared.b64dec(order["phone_number"].ToString());

                    JArray items = (JArray)jsonObj["items"];

                    foreach (JObject item in items)
                    {
                        string product_id = service.shared.b64dec(item["product_id"].ToString());
                        string quantity = service.shared.b64dec(item["quantity"].ToString());
                     
                        model.shared.order_item current_item = new model.shared.order_item
                        {
                            product_id = product_id,
                            quantity = quantity,
                            order_id = "9999",

                        };
                        items_list.Add(current_item);


                    }
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


                //string controller_user_id, string controller_session_token, string title, string content, string created_at,
                //      string email, string billing_name, string shipping_name, string tracking_token, string order_status,
                //string shipping_company, string price, string city, string guest,
                //string zipcode, string address, string apartment_number, string note, string house_number, string phone_number)

                                (int,string) resp = service.create_order.process_create_order(
                    controller_user_id,
                    controller_session_token,
                    email,
                    billing_name,
                    shipping_name,
                    shipping_company,
                    price,
                    city,
                    guest,
                    zipcode,
                    address,
                    apartment_number,
                    note,
                    house_number,
                    phone_number,
                    items_list
                );





                if (resp.Item1 == 200)
                {
                    var respon = new
                    {
                        status = "success",
                        statuscode = "200",
                        tracking_token = resp.Item2

                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 200;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp.Item1 == 400)
                {
                    var respon = new
                    {
                        status = "malformed_request",
                        statuscode = "400"
                    };
                    string jsonresponse = JsonSerializer.Serialize(respon);

                    data.Response.StatusCode = 400;
                    byte[] buffer2 = Encoding.UTF8.GetBytes(jsonresponse);
                    data.Response.OutputStream.Write(buffer2, 0, buffer2.Length);
                }
                else if (resp.Item1 == 403)
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
                else if (resp.Item1 == 500)
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
                else if (resp.Item1 == 401)
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
                service.shared.log($"Error: {ex.Message} --controller.create_post");

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