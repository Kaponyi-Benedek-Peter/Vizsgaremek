using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Servo.controller;
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

        public async Task start_server(int port)
        {
            //service.shared.log("[starting server 1.1]");

            isrunning = true;
            service.shared.init();
            jwt_handler.init();
            //service.shared.log("[starting server 1.2]");

            hallgatozo.Prefixes.Add($"http://+:{port.ToString()}/");

            hallgatozo.Start();

            //service.shared.log("[starting server 1.3]");

            //service.shared.log("[server started 1/1]");
            //service.shared.log($"hosting at: http://localhost:{port}/");
            //service.shared.log($"hosting from: {service.shared.baseDir}\n");

            //service.shared.log("[starting server 2]");

            cts = new CancellationTokenSource();
            var token = cts.Token;


            ThreadPool.SetMinThreads(100, 100); // no befagyas


            server_main = Task.Factory.StartNew(() =>
            {
                service.shared.log("[! server started !]", "server");

                while (isrunning)
                {
                    try
                    {
                        
                        HttpListenerContext context = hallgatozo.GetContext();

                      
                        ThreadPool.QueueUserWorkItem(o =>
                        {
                            try
                            {
                                controller.router.main(context, service.shared.baseDir);
                            }
                            catch { }
                        });
                    }
                    catch (Exception ex)
                    {
                        
                        if (!isrunning) break;
                        Thread.Sleep(100);
                    }
                }
            }, TaskCreationOptions.LongRunning);





            honeypotport = Task.Factory.StartNew(() =>
            {


                HttpListener trap = new HttpListener();
                trap.Prefixes.Add("http://+:8080/");
                trap.Prefixes.Add("http://+:3000/");
                trap.Prefixes.Add("http://+:3001/");
                trap.Prefixes.Add("http://+:4200/");
                trap.Prefixes.Add("http://+:5000/");
                trap.Prefixes.Add("http://+:8888/");
                trap.Prefixes.Add("http://+:4000/");
                trap.Prefixes.Add("http://+:6379/");
                trap.Prefixes.Add("http://+:1433/");
                trap.Prefixes.Add("http://+:5984/");
                trap.Prefixes.Add("http://+:9090/");
                trap.Prefixes.Add("http://+:2375/");
                trap.Prefixes.Add("http://+:21/");
                trap.Prefixes.Add("http://+:23/");
                trap.Prefixes.Add("http://+:2222/");
                trap.Prefixes.Add("http://+:4444/");


                trap.Prefixes.Add("http://+:514/");
                trap.Prefixes.Add("http://+:513/");
                trap.Prefixes.Add("http://+:512/");
                
                trap.Start();
                service.shared.log("[honeypot started]", "server");

                while (!token.IsCancellationRequested)
                {
                    try
                    {
                        HttpListenerContext ctx = trap.GetContext();
                        string ip = ctx.Request.RemoteEndPoint.Address.ToString();
                        router.honeypot_ips.Add(ip);
                        service.shared.log($"[honeypot hit] {ip}", "server");
                        //ctx.Response.StatusCode = 404;
                        ctx.Response.Close();
                    }
                    catch (Exception ex) when (!token.IsCancellationRequested)
                    {
                        service.shared.log($"Error: {ex.Message} --honeypot", "server");
                    }
                }

                trap.Stop();
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
                        service.shared.log($"Error 2: {ex.Message} --lib.shared.start_server > email_auth refresh", "server");
                    }

                     
                    Thread.Sleep(150000); // 2.5m
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
                            service.shared.log($"[exchange rate fetched succesfully]", "server");
                        }
                    }
                    catch (Exception ex)
                    {
                        service.shared.log($"Error 3: {ex.Message} --lib.shared > exhange_rates", "server");
                    }

                    Thread.Sleep(3000000);
                }
            }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);



            /* anti_ddos = Task.Factory.StartNew(() =>
             {
                 while (!token.IsCancellationRequested)
                 {
                     router.connectioncounts.Clear();

                     Thread.Sleep(10000);
                 }
             }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);
            */


             iplog = Task.Factory.StartNew(() =>
            {
                while (!token.IsCancellationRequested)
                {
                    router.connectioncounts.Clear();
                    
                    Thread.Sleep(10000);
                }
            }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);
           


        }

        // conf (    Read/Write , id (pl email), val (érték)    )

        public Boolean isrunning = false;
        public HttpListener hallgatozo = new HttpListener();
        public Task server_main;

        public Task email_auth_refresh;

        public Task newsletter_main;
        public Task honeypotport;

        public Task exchange_rates;
        
        //public Task anti_ddos;

        public Task iplog;



        public CancellationTokenSource cts;
        static CancellationToken token = new CancellationTokenSource().Token; // homok a levegőben


    }
}
