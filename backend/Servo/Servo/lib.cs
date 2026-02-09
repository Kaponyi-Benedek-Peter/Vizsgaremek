using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
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
            jwt_handler.init();


            hallgatozo.Prefixes.Add($"http://+:{port.ToString()}/");

            hallgatozo.Start();
            service.shared.log("[server started 1/1]");
            service.shared.log($"hosting at: http://localhost:{port}/");
            service.shared.log($"hosting from: {service.shared.baseDir}\n");


            cts = new CancellationTokenSource();
            var token = cts.Token;

            server_main = Task.Factory.StartNew(() =>
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

                        service.shared.log("[server stopped 1/1]");
                    }
                    catch (Exception ex)
                    {

                        service.shared.log($"Error: {ex.Message} --lib.shared.start_server > server");
                    }
                }
            }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);





            email_auth_refresh = Task.Factory.StartNew(() =>
            {
                while (!token.IsCancellationRequested)
                {
                    try
                    {
                        service.shared.email_auth_address = service.shared.conf("r", "email_auth_address");
                        service.shared.email_auth_key = service.shared.conf("r", "email_auth_key");
                    }
                    catch (Exception ex)
                    {
                        service.shared.log($"Error: {ex.Message} --lib.shared.start_server > email_auth refresh");
                    }


                    Thread.Sleep(300000);
                }
            }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);




            exchange_rates = Task.Factory.StartNew(() =>
            {
                while (!token.IsCancellationRequested)
                {
                    try
                    {
                        using (HttpClient client = new HttpClient())
                        {
                           
                            string json = client.GetStringAsync("https://api.frankfurter.app/latest?from=HUF&to=EUR,USD").Result;

                            dynamic data = JsonConvert.DeserializeObject(json);

                            service.shared.eur = (double)data.rates.EUR;
                            service.shared.usd = (double)data.rates.USD;
                            service.shared.log($"[exchange rate fetched succesfully]");
                        }
                    }
                    catch (Exception ex)
                    {
                        service.shared.log($"Error: {ex.Message} --lib.exchange_rates");
                    }

                    Thread.Sleep(300000);
                }
            }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);






        }

        // conf (    Read/Write , id (pl email), val (érték)    )

        public Boolean isrunning = false;
        public HttpListener hallgatozo = new HttpListener();
        public Task server_main;

        public Task email_auth_refresh;

        public Task newsletter_main;

        public Task exchange_rates;


        public CancellationTokenSource cts;
        static CancellationToken token = new CancellationTokenSource().Token; // homok a levegőben


    }
}
