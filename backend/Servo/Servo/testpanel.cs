using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static Servo.model.shared;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace Servo
{
    public partial class testpanel : Form
    {
        public testpanel()
        {
            InitializeComponent();
            Instance = this; // hogy hívható legyen a form
        }
        static shared sh = new shared(); // shared class meghívása
        public static testpanel Instance { get; private set; }


        // hogy ne robbantsa fel magát mert akkor nem lesz tobbszor hivás
        private void testpanel_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (e.CloseReason == CloseReason.UserClosing)
            {
                e.Cancel = true;
                this.Hide();
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            service.shared.send_mail(textBox1.Text, DateTime.Now.ToString(), "teszt email", "test");
            service.shared.log("[Test email sent]");
        }

      
        private void testpanel_Load(object sender, EventArgs e)
        {

        }


        private void button2_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestusers();
            service.shared.log("[Add test users]");
        }

        private void button3_Click(object sender, EventArgs e)
        {
            model.shared.delete_all_users();
            service.shared.log("[Delete all users]");
        }

        private void button7_Click(object sender, EventArgs e)
        {
            model.shared.delete_all_products();
            service.shared.log("[Delete all products]");
        }

        private void button8_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestproducts();
            service.shared.log("[Add test products]");
        }

        private void button12_Click(object sender, EventArgs e)
        {
           service.nonapi_test.addtestconfirmations(Convert.ToInt32(confirmations_tbox.Text));
            service.shared.log("[Add test confirmations]");
        }

        private void button11_Click(object sender, EventArgs e)
        {
            service.nonapi_test.deleteallconfirmations();
            service.shared.log("[Delete all confirmations]");
        }

        private void button10_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestorders(Convert.ToInt32(orders_tbox.Text));
            service.shared.log("[Add test orders]");

           
        }

        private void button9_Click(object sender, EventArgs e)
        {
            service.nonapi_test.deleteallorders();
            service.shared.log("[Delete all orders]");
        }

        private void button14_Click(object sender, EventArgs e)
        {
            service.nonapi_test.deleteallreviews();
            service.shared.log("[Delete all reviews]");
        }

        private void button13_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestreviews(reviews_tbox.Text);
            service.shared.log("[Add test reviews]");
        }

        private void button6_Click(object sender, EventArgs e)
        {
            service.nonapi_test.deleteallreviews();
            service.nonapi_test.deleteallorders();
            service.nonapi_test.deleteallconfirmations();
            model.shared.delete_all_users();
            model.shared.delete_all_products();

            service.shared.log("[Delete all]");
        }

        private void button1_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestimages(Convert.ToInt32(product_image_tbox.Text));
        }

        private void button15_Click(object sender, EventArgs e)
        {
            service.nonapi_test.deleteallimages();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            string otp = service.shared.gen_code(true);
            service.shared.send_mail(otptestbox.Text, "Your OTP code", service.registration_request.registerhtml_top + $"{otp}" + service.registration_request.registerhtml_bottom, "otp");
            textBox2.Text=otp;
        }
    }
}
