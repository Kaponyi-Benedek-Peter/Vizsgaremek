using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
namespace Servo
{
    public class shared
    {
       
        public void start_server(int port)
        {
            isrunning = true;
            service.shared.init();


            hallgatozo.Prefixes.Add($"http://+:{port.ToString()}/");
            
            hallgatozo.Start();
            service.shared.log($"http://localhost:{port}/");
            service.shared.log("running at: " + service.shared.baseDir);

            cts = new CancellationTokenSource();
            var token = cts.Token;

            taszkcia = Task.Factory.StartNew(() =>
            {
                while (!token.IsCancellationRequested)
                {
                    try
                    {
                        HttpListenerContext context = hallgatozo.GetContext();
                        ThreadPool.QueueUserWorkItem(o => controller.handle.main(context, service.shared.baseDir));

                        Form1.Instance.updateconnections();
                    }
                    catch (HttpListenerException ex) when (token.IsCancellationRequested)
                    {

                        service.shared.log("stopped (1/1)");
                    }
                    catch (Exception ex)
                    {
                        service.shared.log("error: " + ex.Message);
                    }
                }
            }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);
        }

        // conf (    Read/Write , id (pl email), val (érték)    )

        public Boolean isrunning = false;
        public HttpListener hallgatozo = new HttpListener();
        public Task taszkcia;
        public CancellationTokenSource cts;
        static CancellationToken token = new CancellationTokenSource().Token; // homok a levegőben


    }
}
