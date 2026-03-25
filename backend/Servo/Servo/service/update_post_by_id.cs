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
    internal class update_post_by_id
    {

        //Teljes szövegek
        /*
         
Teljes szövegek
id
title
content
user_id
created_at
image_url
category_id
updated_at
slug
excerpt
status
views
likes
comment_count
is_featured
published_at
last_activity_at
tags

         */
        public static int process_update_post_by_id(string controller_user_id, string controller_session_token, string post_id, string title, string content, string created_at,
            string image_url, string category_id, string updated_at, string slug, string except,
            string status, string views, string likes, string comment_count,
             string is_featured, string published_at, string last_activity_at, string tags)
        {
            try
            {
                service.shared.log("Update post request: " + title);

                string model_session_token = model.shared.get_token_by_id(controller_user_id);
                string accstate = model.shared.get_account_state_by_id(controller_user_id);
                //MessageBox.Show(accstate);
                if (model_session_token != controller_session_token)
                {
                    return 401;
                }
                else
                {


                    model.shared.post pos;

                    if (accstate == "admin" || accstate == "superadmin")
                    {


                        /*
                         * string controller_user_id, string controller_session_token,string title,
                         * string content, string user_id, string created_at,
            string image_url, string category_id, string updated_at, string slug, string except,
            string status, string views, string likes, string comment_count,
             string is_featured, string published_at, string last_activity_at, string tags
     */
                        try
                        {
                            pos = new model.shared.post
                            {

                                title = title,
                                content = content,
                                user_id = Convert.ToInt32(controller_user_id),
                                published_at = published_at,
                                created_at = created_at,
                                image_url = image_url,
                                category_id = category_id,
                                updated_at = updated_at,
                                slug = slug,
                                excerpt = except,
                                status = status,
                                views = Convert.ToInt32(views),
                                likes = Convert.ToInt32(likes),
                                comment_count = Convert.ToInt32(comment_count),
                                is_featured = Convert.ToInt32(is_featured),
                                last_activity_at = last_activity_at,
                                tags = tags




                            };
                        }
                        catch (Exception ex)
                        {

                            return 400;
                        }


                        int result = model.shared.update_post_by_id(pos,post_id);

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
                service.shared.log($"Error 1: {ex.Message} --service.update_post_By_id.process_update_post_by_id");
                return 400;
            }
        }






    }
}
