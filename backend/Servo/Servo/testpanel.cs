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

        }

      
        private void testpanel_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            
            
        }

        private void button2_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestusers();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            model.shared.delete_all_users();
        }

        private void button7_Click(object sender, EventArgs e)
        {
            model.shared.delete_all_products();
        }

        private void button8_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestproducts();
        }

        private void button12_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestconfirmations();
        }

        private void button11_Click(object sender, EventArgs e)
        {
            service.nonapi_test.deleteallconfirmations();
        }

        private void button10_Click(object sender, EventArgs e)
        {
            service.nonapi_test.addtestorders();
        }

        private void button9_Click(object sender, EventArgs e)
        {
            service.nonapi_test.deleteallorders();
        }
    }
}
