using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Servo.service
{
    internal class shared
    {
        public static string baseDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "public");
        public static void init()
        {
            
            if (!Directory.Exists(baseDir))
                Directory.CreateDirectory(baseDir);
        }

        public static string current_url = "https://roysshack.hu/"; //https://www.roysshack.hu


        public static string b64enc(string str)
        {
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(str));
        }
        public static string b64dec(string str)
        {
            return System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(str));
        }

        static string thumbnail_template(int id) {return $"{service.shared.current_url}assets/products/{id}/thumbnail.webp"; }
        public static void log(string abc, string type="api")
        {
            var f = Form1.Instance;
            if (f == null)
            {
                MessageBox.Show("Form1 not created");
                return;
            }

            if (!f.IsHandleCreated)
            {
                MessageBox.Show("Form1 handle not ready");
                return;
            }

            if(type=="api") f.InvokeOnUi(() => f.api_rtbox.AppendText(abc + Environment.NewLine));
            else if (type == "static") { f.InvokeOnUi(() => f.static_rtbox.AppendText(abc + Environment.NewLine)); }
            else if (type == "server") { f.InvokeOnUi(() => f.server_rtbox.AppendText(abc + Environment.NewLine)); }

            f.InvokeOnUi(() => f.all_rtbox.AppendText(abc + Environment.NewLine));

        }
        private const int KeySize = 32;
        private const int Iterations = 1000;
        private static readonly byte[] salt = Encoding.UTF8.GetBytes("gerherbeherg");
        public static string hashpass(string password)
        {

            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations))
            {
                byte[] key = pbkdf2.GetBytes(KeySize);
                return Convert.ToBase64String(key);
            }
        }


        //Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
        public static (string, bool) mime(string ext)
        {
            List<(string ext, string type, bool isStatic)> mimes = new List<(string, string, bool)>
    {
        // Static assets (isStatic: true)
        (".png",  "image/png",              true),
        (".jpg",  "image/jpeg",             true),

        (".webp", "image/image/webp",             true),
        (".jpeg", "image/jpeg",             true),

        (".gif",  "image/gif",              true),
        (".svg",  "image/svg+xml",          true),
        (".ico",  "image/x-icon",           true),
        (".woff", "font/woff",              true),
        (".woff2","font/woff2",             true),
        (".ttf",  "font/ttf",               true),
        (".eot",  "application/vnd.ms-fontobject", true),
        (".mp4",  "video/mp4",              true),
        (".mp3",  "audio/mpeg",             true),
        (".wav",  "audio/wav",              true),
        (".webm", "video/webm",             true),
        (".ogg",  "audio/ogg",              true),

        (".html", "text/html",              false),
        (".css",  "text/css",               false),
        (".js",   "application/javascript",  false),
        (".pdf",  "application/pdf",        false),
        (".json", "application/json",       false),
        (".xml",  "application/xml",        false),
        (".txt",  "text/plain",             false),
        (".csv",  "text/csv",               false),
        (".zip",  "application/zip",        false),
        (".tar",  "application/x-tar",      false),
        (".gz",   "application/gzip",       false)
    };

            string extLower = ext?.ToLower();
            foreach (var (extension, type, isStatic) in mimes)
            {
                if (extension == extLower)
                    return (type, isStatic);
            }

            return ("application/octet-stream", false);
        }



        public static double usd=0.0027;
        public static double eur=0.0025;


        public static List<double> exchange(double inn)
        {
            

            return new List<double> { Math.Round(inn * usd,1), Math.Round(inn * eur,1)};
        }



        public static string email_auth_address = conf("r", "email_auth_address");
        public static string email_auth_key = conf("r", "email_auth_key");
        public static void send_mail(string hova, string title, string body, string tipus)
        {
            try
            {
                var msg = new MailMessage();
                msg.From = new MailAddress("noreply@roysshack.hu", "Roy's Shack"); // ez még teszt stádiumban van, majd később tawa.hu-rol fog menni a dolog
                msg.To.Add(hova);
                msg.Subject = title;
                msg.Body = body;
                msg.BodyEncoding = Encoding.UTF8;
                msg.IsBodyHtml = true; // html email
                var smtp = new SmtpClient("smtp.gmail.com", 587);//1025 // kicakhist

                smtp.EnableSsl = true;
                
                smtp.Credentials = new NetworkCredential(email_auth_address, email_auth_key);

                smtp.Send(msg);
                Form1.Instance.log($"{tipus} email sent to {hova} || ok");
            }
            catch (Exception ex)
            {
                log($"{tipus} email sent: {hova} || ERROR: {ex.ToString()}");
                
            }
        }
        public static string gen_string(int n)
        {
            string ABC = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            Random rnd = new Random();
            string outt = "";
            for (int i = 0; i < n; i++) { outt += ABC[rnd.Next(0, ABC.Length)]; }
            return outt.ToString();
        }
        public static string gen_code(Boolean otpvagynem)
        {
            Random rnd = new Random();

            if (!otpvagynem) return gen_string(22);
            else { return rnd.Next(100000, 999999).ToString(); }
        }


        public static string conf(string rw, string id, string val = "___")
        {
            string location = "roys_conf.ini";
            if (!File.Exists(location)) { File.WriteAllText(location, "init:true\n"); }


            if (rw == "r")
            {
                string eredmeny = "___";
                String[] con = File.ReadAllText(location).Split('\n');
                foreach (var item in con)
                {
                    string[] crrln = item.Split(':');
                    if (crrln[0] == id)
                    {
                        eredmeny = crrln[1];
                    }
                }
                return eredmeny;
            }

            else
            {
                string outx = "";
                Boolean found = false;
                foreach (var item in File.ReadAllText(location).Split('\n'))
                {
                    string[] crrln = item.Split(':');
                    try
                    {
                        if (crrln[0] != id) { outx += crrln[0] + ":" + crrln[1]; }
                        else { outx += id + ":" + val; found = true; }
                        outx += "\n";
                    }
                    catch { }
                }
                if (!found) { outx += id + ":" + val; }
                File.Delete(location);
                File.WriteAllText(location, outx);
            }




            return "";
        }



        public static string Encrypt(string password, string plaintext)
        {
            byte[] salt = new byte[16];
            byte[] iv = new byte[16];

            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
                rng.GetBytes(iv);
            }

            byte[] key = DeriveKey(password, salt);
            byte[] ciphertext;

            using (var aes = Aes.Create())
            {
                aes.Key = key;
                aes.IV = iv;
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using (var encryptor = aes.CreateEncryptor())
                {
                    using (var ms = new MemoryStream())
                    {
                        using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                        {
                            byte[] data = Encoding.UTF8.GetBytes(plaintext);
                            cs.Write(data, 0, data.Length);
                            cs.FlushFinalBlock();
                            ciphertext = ms.ToArray();
                        }
                    }
                }
            }

            byte[] combined = new byte[salt.Length + iv.Length + ciphertext.Length];
            Buffer.BlockCopy(salt, 0, combined, 0, salt.Length);
            Buffer.BlockCopy(iv, 0, combined, salt.Length, iv.Length);
            Buffer.BlockCopy(ciphertext, 0, combined, salt.Length + iv.Length, ciphertext.Length);

            return Convert.ToBase64String(combined);
        }

        public static string Decrypt(string password, string encryptedData)
        {
            byte[] combined = Convert.FromBase64String(encryptedData);
            byte[] salt = new byte[16];
            byte[] iv = new byte[16];
            byte[] ciphertext = new byte[combined.Length - 32];

            Buffer.BlockCopy(combined, 0, salt, 0, 16);
            Buffer.BlockCopy(combined, 16, iv, 0, 16);
            Buffer.BlockCopy(combined, 32, ciphertext, 0, ciphertext.Length);

            byte[] key = DeriveKey(password, salt);

            using (var aes = Aes.Create())
            {
                aes.Key = key;
                aes.IV = iv;
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using (var decryptor = aes.CreateDecryptor())
                {
                    using (var ms = new MemoryStream(ciphertext))
                    {
                        using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                        {
                            using (var sr = new StreamReader(cs))
                            {
                                return sr.ReadToEnd();
                            }
                        }
                    }
                }
            }
        }
        private static byte[] DeriveKey(string password, byte[] salt)
        {
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 1000, HashAlgorithmName.SHA256))
            {
                return pbkdf2.GetBytes(32);
            }
        }



















    }
}
