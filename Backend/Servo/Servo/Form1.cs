using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.Net;
using System.Net.Mail;
using System.Reflection;


namespace Servo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public void log(string abc)
        {
            richTextBox1.Invoke(new Action(() =>
             richTextBox1.AppendText(abc + Environment.NewLine) // task factory miatti hiba kikerülése
         ));
        }
        public HttpListener hallgatozo = new HttpListener();
        public Task taszkcia;
        private CancellationTokenSource cts;
        static CancellationToken token = new CancellationTokenSource().Token; // homok a levegőben
        public void button1_Click(object sender, EventArgs e)
        {
            string baseDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "public");
            if (!Directory.Exists(baseDir))
                Directory.CreateDirectory(baseDir);


            hallgatozo.Prefixes.Add("http://+:5000/");
            hallgatozo.Start();

            log("http://localhost:5000/");
            log("running at: " + baseDir);

            cts = new CancellationTokenSource();
            var token = cts.Token;

            taszkcia = Task.Factory.StartNew(() =>
            {
                while (!token.IsCancellationRequested)
                {
                    try
                    {
                        HttpListenerContext context = hallgatozo.GetContext();
                        ThreadPool.QueueUserWorkItem(o => serve(context, baseDir));
                    }
                    catch (HttpListenerException ex) when (token.IsCancellationRequested)
                    {

                        log("stopped (1/1)");
                    }
                    catch (Exception ex)
                    {
                        log("error: " + ex.Message);
                    }
                }
            }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);

        }





        public void serve(HttpListenerContext data, string alap)
        {
            string kert = data.Request.Url.AbsolutePath.TrimStart('/');
            textBox2.Text = (int.Parse(textBox2.Text) + 1).ToString();
            //api 
            if (kert.StartsWith("api/", StringComparison.OrdinalIgnoreCase))
            {
                string lenyeg = kert.Replace("api/", "");


                byte[] byteresponse = Encoding.UTF8.GetBytes("asdasd");
                data.Response.ContentType = "application/json";
                data.Response.OutputStream.Write(byteresponse, 0, byteresponse.Length);
            }
            else // nem api
            {

                string hely = Path.Combine(alap, kert);

                if (Directory.Exists(hely))
                    hely = Path.Combine(hely, "index.html");

                if (File.Exists(hely))
                {
                    try
                    {
                        byte[] fileBytes = File.ReadAllBytes(hely);
                        data.Response.ContentType = mime(Path.GetExtension(hely));
                        data.Response.OutputStream.Write(fileBytes, 0, fileBytes.Length);
                        log(data.Request.RemoteEndPoint.Address.ToString() + hely + " || ok");
                        textBox3.Text = (int.Parse(textBox3.Text) + 1).ToString();
                    }
                    catch (Exception ex)
                    {
                        data.Response.StatusCode = 500;
                        byte[] buffer = Encoding.UTF8.GetBytes("error"); // elhallgatni a hibát és sunyiban lejelenteni 3 sorral lejjebb
                        data.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        textBox6.Text = (int.Parse(textBox6.Text) + 1).ToString();
                        log(data.Request.RemoteEndPoint.Address.ToString() + hely + " || ERROR: " + ex.Message);
                    }
                }
                else
                {


                    data.Response.StatusCode = 404;
                    byte[] buffer = Encoding.UTF8.GetBytes("file not found");
                    data.Response.OutputStream.Write(buffer, 0, buffer.Length);

                    textBox6.Text = (int.Parse(textBox6.Text) + 1).ToString();

                    log(data.Request.RemoteEndPoint.Address.ToString() + hely + " || ERROR: file not found");
                }
            }

            data.Response.OutputStream.Close();
        }





        static string mime(string ext)
        {


            List<string[]> mimes = new List<string[]>
            {
                new[] { ".html", "text/html" },
                new[] { ".css", "text/css" },
                new[] { ".js", "application/javascript" },
                new[] { ".json", "application/json" },
                new[] { ".png", "image/png" },
                new[] { ".jpg", ".jpeg", "image/jpeg" },
                new[] { ".gif", "image/gif" },
                new[] { ".mp4", "video/mp4" },
                new[] { ".mp3", "audio/mpeg" },
                new[] { ".txt", "text/plain" }
            };

            foreach (var item in mimes)
            {
                if (item[0] == ext.ToLower())
                    return item[1];
            }
            return "application/octet-stream";


        }

        private void button2_Click(object sender, EventArgs e)
        {
            hallgatozo.Stop();
            cts.Cancel();
            log("stopped (0/1)");
        }

        private void Form1_Load(object sender, EventArgs e)
        {
           
        }

        private void sendmail(string hova,string title, string body,string tipus) {
            try { 
            var msg = new MailMessage();
                msg.From = new MailAddress("REDACTED@REDACTED.hu", "Roy's Shack"); // ez még teszt stádiumban van, majd később tawa.hu-rol fog menni a dolog
            msg.To.Add(hova);
            msg.Subject = title;
            msg.Body = body;

            var smtp = new SmtpClient("smtp.gmail.com", 587);

            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("REDACTED@gmail.com", "REDACTED");

            smtp.Send(msg);
            log($"{tipus} email sent to {hova} || ok");
            }
            catch (Exception ex)
            {
                log($"{tipus} email sent: {hova} || ERROR: {ex.ToString()}");
                textBox6.Text = (int.Parse(textBox6.Text) + 1).ToString();
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            sendmail("kerepesi.aron@szechenyi.hu", DateTime.Now.ToString(), "teszt email", "test");
            

        }
    }
}
