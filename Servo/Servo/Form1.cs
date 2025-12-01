using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;



namespace Servo
{
    public partial class Form1 : Form
    {
       
        static shared sh = new shared(); // shared class meghívása


        public static Form1 Instance { get; private set; }
        public static testpanel testpanell = new testpanel();
        public RichTextBox LogBox => richTextBox1;

        public Form1()
        {
           
            InitializeComponent();
            Instance = this;
        }

        protected override void OnFormClosed(FormClosedEventArgs e)
        {
            base.OnFormClosed(e);
            Instance = null;
        }

        public void InvokeOnUi(Action action)
        {
            if (IsDisposed || !IsHandleCreated) return;
            if (InvokeRequired) Invoke(action);
            else action();
        }
        public void log(string abc)
        {

            richTextBox1.Invoke(new Action(() =>
             richTextBox1.AppendText(abc + Environment.NewLine) // task factory miatti hiba kikerülése
         ));
        }

      

        public void updateerrorcount()
        {
            error_textbox.Invoke(new Action(() =>
            {
                error_textbox.Text = (int.Parse(error_textbox.Text)+1).ToString();
            }));
        }
        public void updatefilesserved()
        {
            files_textbox.Invoke(new Action(() =>
            {
                files_textbox.Text = (int.Parse(files_textbox.Text) + 1).ToString();
            }));
        }
        public void updateconnections()
        {
            conn_textbox.Invoke(new Action(() =>
            {
                conn_textbox.Text = (int.Parse(conn_textbox.Text) + 1).ToString();
            }));
        }
       
      
        public void button1_Click(object sender, EventArgs e)
        {
            startserver();
            
            
        }


        static Boolean firstlaunch = true;
        private void startserver()
        {
           
            if (firstlaunch) { model.shared.init(); }
            firstlaunch = false;
            if (!sh.isrunning)
            {
                try
                {
                    sh.start_server(int.Parse(textBox4.Text));
                    sh.isrunning = true;
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
            else
            {
                stopserver();
                Thread.Sleep(777);
                startserver();
            }
        }
        private void stopserver()
        {
            try
            {
                sh.hallgatozo.Stop();
                sh.cts.Cancel();
                log("stopped (0/1)");
                sh.isrunning = false;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        private void button2_Click(object sender, EventArgs e)
        {
            stopserver();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
           
        }

        private void button3_Click(object sender, EventArgs e)
        {
            items_textbox.Text = "";
            conn_textbox.Text = "";
            files_textbox.Text = "";
            error_textbox.Text = "";
            susconn_textbox.Text = "";
            users_textbox.Text = "";

        }

        private void button6_Click(object sender, EventArgs e)
        {
            testpanell.Show();

        }

        private void button4_Click(object sender, EventArgs e)
        {
            Process.Start("https://www.rackhost.hu/dnsZone");
            Process.Start("https://dash.cloudflare.com/");
        }
    }
}
