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
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
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


        



        private const int WM_SETICON = 0x80;
        private const int ICON_SMALL = 0;
        private const int ICON_BIG = 1;

        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        private static extern IntPtr SendMessage(IntPtr hWnd, int Msg, int wParam, IntPtr lParam);

     
        public Form1()
        {
           
            InitializeComponent();
            Instance = this;
            Icon titleIcon = Properties.Resources.roy_icon_black;
            this.Icon = titleIcon;
            Icon taskbarIcon = Properties.Resources.roy_icon;
            SendMessage(this.Handle, WM_SETICON, ICON_BIG, taskbarIcon.Handle);
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
                    //service.shared.log("[starting server 1]");
                    sh.start_server(int.Parse(textBox4.Text));
                    sh.isrunning = true;
                    //service.shared.log("[starting server 6]");
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
            richTextBox1.Clear();
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

        static Boolean dark = true;
        private void button5_Click(object sender, EventArgs e)
        {
            if (dark)
            {
                dark=false;
                button5.Text = "☀️";
                //255; 128; 128


                richTextBox1.BackColor = Color.FromArgb(255,255,255);
                groupBox1.BackColor = Color.FromArgb(255, 255, 255);


                this.BackColor = Color.FromArgb(255,255,255);

                button1.BackColor = Color.FromArgb(245, 240, 225);
                button2.BackColor = Color.FromArgb(245, 240, 225);
                button4.BackColor = Color.FromArgb(245, 240, 225);
                button5.BackColor = Color.FromArgb(245, 240, 225);
                button6.BackColor = Color.FromArgb(245, 240, 225);

                button3.BackColor = Color.FromArgb(245, 240, 225);


                conn_textbox.BackColor = Color.FromArgb(245, 240, 225);
                susconn_textbox.BackColor = Color.FromArgb(245, 240, 225);
                textBox4.BackColor = Color.FromArgb(245, 240, 225);
                items_textbox.BackColor = Color.FromArgb(245, 240, 225);
                files_textbox.BackColor = Color.FromArgb(245, 240, 225);
                users_textbox.BackColor = Color.FromArgb(245, 240, 225);
                error_textbox.BackColor = Color.FromArgb(245, 240, 225);

                button5.FlatAppearance.BorderColor = Color.FromArgb(63, 61, 61);
                button6.FlatAppearance.BorderColor = Color.FromArgb(63, 61, 61);


                button1.FlatAppearance.BorderColor = Color.FromArgb(6, 122, 69);
                button2.FlatAppearance.BorderColor = Color.FromArgb(255, 128, 128);
















                label1.ForeColor = Color.FromArgb(0, 0, 0);
                label2.ForeColor = Color.FromArgb(0, 0, 0);
                label3.ForeColor = Color.FromArgb(0, 0, 0);

                label6.ForeColor = Color.FromArgb(0, 0, 0);
                label7.ForeColor = Color.FromArgb(0, 0, 0);
                label8.ForeColor = Color.FromArgb(0, 0, 0);




                this.ForeColor = Color.FromArgb(0, 0, 0);
                richTextBox1.ForeColor = Color.FromArgb(0, 0, 0);
                groupBox1.ForeColor = Color.FromArgb(0, 0, 0);

                this.ForeColor = Color.FromArgb(0, 0, 0);
                this.ForeColor = Color.FromArgb(0, 0, 0);

                button1.ForeColor = Color.FromArgb(0, 0, 0);
                button2.ForeColor = Color.FromArgb(0, 0, 0);
                button4.ForeColor = Color.FromArgb(0, 0, 0);
                button5.ForeColor = Color.FromArgb(0, 0, 0);
                button6.ForeColor = Color.FromArgb(0, 0, 0);

                button3.ForeColor = Color.FromArgb(0, 0, 0);


                conn_textbox.ForeColor = Color.FromArgb(0, 0, 0);
                susconn_textbox.ForeColor = Color.FromArgb(0, 0, 0);
                textBox4.ForeColor = Color.FromArgb(0, 0, 0);
                items_textbox.ForeColor = Color.FromArgb(0, 0, 0);
                files_textbox.ForeColor = Color.FromArgb(0, 0, 0);
                users_textbox.ForeColor = Color.FromArgb(0, 0, 0);
                error_textbox.ForeColor = Color.FromArgb(0, 0, 0);



            }
            else
            {



                label1.ForeColor = Color.FromArgb(255,255,255);
                label2.ForeColor = Color.FromArgb(255, 255, 255);
                label3.ForeColor = Color.FromArgb(255, 255, 255);

                label6.ForeColor = Color.FromArgb(255, 255, 255);
                label7.ForeColor = Color.FromArgb(255, 255, 255);
                label8.ForeColor = Color.FromArgb(255, 255, 255);


                this.BackColor=Color.FromArgb(70, 68, 68);
                richTextBox1.BackColor = Color.FromArgb(70, 68, 68);
                groupBox1.BackColor = Color.FromArgb(70, 68, 68);
                
                this.BackColor = Color.FromArgb(70, 68, 68);
                this.BackColor = Color.FromArgb(70, 68, 68);

                button1.BackColor = Color.FromArgb(0, 0, 0);
                button2.BackColor = Color.FromArgb(0, 0, 0);
                button4.BackColor = Color.FromArgb(0, 0, 0);
                button5.BackColor = Color.FromArgb(0, 0, 0);
                button6.BackColor = Color.FromArgb(0, 0, 0);

                button3.BackColor = Color.FromArgb(0, 0, 0);


                conn_textbox.BackColor = Color.FromArgb(0, 0, 0);
                susconn_textbox.BackColor = Color.FromArgb(0, 0, 0);
                textBox4.BackColor = Color.FromArgb(0, 0, 0);
                items_textbox.BackColor = Color.FromArgb(0, 0, 0);
                files_textbox.BackColor = Color.FromArgb(0, 0, 0);
                users_textbox.BackColor = Color.FromArgb(0, 0, 0);
                error_textbox.BackColor = Color.FromArgb(0, 0, 0);

                button5.FlatAppearance.BorderColor = Color.Silver;
                button6.FlatAppearance.BorderColor = Color.Silver;


                button1.FlatAppearance.BorderColor = Color.FromArgb(22, 150, 110);
                button2.FlatAppearance.BorderColor= Color.FromArgb(255, 106, 106);




















                this.ForeColor = Color.FromArgb(255, 255, 255);
                richTextBox1.ForeColor = Color.FromArgb(255, 255, 255);
                groupBox1.ForeColor = Color.FromArgb(255, 255, 255);

                this.ForeColor = Color.FromArgb(255, 255, 255);
                this.ForeColor = Color.FromArgb(255, 255, 255);

                button1.ForeColor = Color.FromArgb(255, 255, 255);
                button2.ForeColor = Color.FromArgb(255, 255, 255);
                button4.ForeColor = Color.FromArgb(255, 255, 255);
                button5.ForeColor = Color.FromArgb(255, 255, 255);
                button6.ForeColor = Color.FromArgb(255, 255, 255);

                button3.ForeColor = Color.FromArgb(255, 255, 255);


                conn_textbox.ForeColor = Color.FromArgb(255, 255, 255);
                susconn_textbox.ForeColor = Color.FromArgb(255, 255, 255);
                textBox4.ForeColor = Color.FromArgb(255, 255, 255);
                items_textbox.ForeColor = Color.FromArgb(255, 255, 255);
                files_textbox.ForeColor = Color.FromArgb(255, 255, 255);
                users_textbox.ForeColor = Color.FromArgb(255, 255, 255);
                error_textbox.ForeColor = Color.FromArgb(255, 255, 255);

             

                dark = true;
                button5.Text = "🌙";
            }
        }
    }
}
