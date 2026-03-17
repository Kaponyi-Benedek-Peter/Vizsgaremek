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
    internal class update_post_comment_by_comment_id
    {

        public static int process_update_post_comment_by_comment_id(string controller_user_id, string controller_session_token, string comment_id,
            string content)
        {
            try
            {
                service.shared.log("Update post comment request: " + controller_user_id);

                string model_session_token = model.shared.get_token_by_id(controller_user_id);
                string accstate = model.shared.get_account_state_by_id(controller_user_id);
                //MessageBox.Show(accstate);
                if (model_session_token != controller_session_token)
                {
                    return 401;
                }
                else
                {

                    string comment_user_id = model.shared.get_user_id_by_post_comment_id(comment_id);

                    model.shared.post pos;

                    if (accstate == "admin" || accstate == "superadmin" || (accstate == "verified" && comment_user_id == controller_user_id))
                    {


                        int result = model.shared.update_post_comment_by_comment_id(comment_id, content);

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
                service.shared.log($"Error 1: {ex.Message} --service.update_post_comment_by_comment_id.process_update_post_comment_by_comment_id");
                return 400;
            }
        }






    }
}
