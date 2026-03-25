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
    internal class create_post_comment_by_post_id
    {

        public static int process_create_post_comment_by_post_id(string controller_user_id, string controller_session_token, string post_id,
            string content)
        {
            try
            {
                service.shared.log("Create post comment request: " + controller_user_id);

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

                    if (accstate == "admin" || accstate == "superadmin" || accstate == "verified")
                    {


                        /*
                         * string controller_user_id, string controller_session_token,string title,
                         * string content, string user_id, string created_at,
            string image_url, string category_id, string updated_at, string slug, string except,
            string status, string views, string likes, string comment_count,
             string is_featured, string published_at, string last_activity_at, string tags
     */

                        int result = model.shared.create_post_comment_by_post_id(post_id,controller_user_id,content);

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
                service.shared.log($"Error 1: {ex.Message} --service.create_post.process_create_post_comment_by_post_id");
                return 400;
            }
        }






    }
}
