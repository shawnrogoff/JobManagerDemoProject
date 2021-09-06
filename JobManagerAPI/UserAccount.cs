using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;


namespace JobManagerAPI
{
    public class UserAccount
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Enabled { get; set; }
        public DateTime LastLogin { get; set; }
        public DateTime LastFailedLogin { get; set; }
        public int FailedLoginCount { get; set; }
        public string Role { get; set; }


        public static List<UserAccount> CheckForUsername(SqlConnection con, string username)
        {
            // Create a list of customer objects
            List<UserAccount> userAccounts = new List<UserAccount>();

            SqlCommand cmd = new SqlCommand("SELECT [userId] FROM [user] WHERE [username] = @Username", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@Username", System.Data.SqlDbType.VarChar);
            cmd.Parameters["@Username"].Value = username;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                // Create a new userAccount object to store properties inside
                UserAccount userAccount = new UserAccount();

                userAccount.UserId = Convert.ToInt32(rdr["userId"]);

                userAccounts.Add(userAccount);
            }

            return userAccounts;
        }

        public static List<UserAccount> GetUsernameAndPasswordForValidation(SqlConnection con, UserAccount userAccount)
        {
            // Create a list of customer objects
            List<UserAccount> userAccounts = new List<UserAccount>();

            SqlCommand cmd = new SqlCommand("SELECT [username], [password] FROM [user] WHERE [username] = @Username", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@Username", System.Data.SqlDbType.VarChar);

            cmd.Parameters["@Username"].Value = userAccount.Username;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                userAccount.Username = rdr["username"].ToString();
                userAccount.Password = rdr["password"].ToString();

                userAccounts.Add(userAccount);
            }

            return userAccounts;
        }

        public static string ExtractCorrectPassword(List<UserAccount> userAccounts)
        {
            foreach (var userAccount in userAccounts)
            {
                return userAccount.Password.ToString();
            }

            return "No correct password found.";
        }
        public static string PasswordValidation(string username, string password, string correctPassword)
        {
            bool validLogin = Hashing.ValidatePassword(password, correctPassword);

            if (validLogin == true)
            {
                string messageString = $"There IS a username and password match!";
                return messageString;
            }
            else
            {
                string messageString = $"No username and password match found.";
                return messageString;
            }
        }

        public static int InsertUser(SqlConnection con, UserAccount userAccount)
        {
            int rowsInserted = 0;
            SqlCommand cmd = new SqlCommand("INSERT INTO user (username, password, email, enabled, role) VALUES (@Username, @Password, @Email, @Enabled, @Role)", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@Username", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Password", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Email", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Enabled", System.Data.SqlDbType.Bit);
            cmd.Parameters.Add("@Role", System.Data.SqlDbType.VarChar);

            string passwordInput = userAccount.Password;
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(passwordInput, Hashing.GetRandomSalt());

            cmd.Parameters["@Username"].Value = userAccount.Username;
            cmd.Parameters["@Password"].Value = hashedPassword;
            cmd.Parameters["@Email"].Value = userAccount.Email;
            cmd.Parameters["@Enabled"].Value = 1;
            cmd.Parameters["@Role"].Value = userAccount.Role;

            rowsInserted = cmd.ExecuteNonQuery();
            return rowsInserted;
        }

        // public static int InsertUserGet(SqlConnection con, string username, string password, string email, string role)
        // {
        //     int rowsInserted = 0;
        //     SqlCommand cmd = new SqlCommand("INSERT INTO [user] ([username], [password], [email], [enabled], [role], failed_login_count) VALUES (@Username, @Password, @Email, @Enabled, @Role, @FailedLoginCount)", con);
        //     cmd.CommandType = System.Data.CommandType.Text;

        //     cmd.Parameters.Add("@Username", System.Data.SqlDbType.VarChar);
        //     cmd.Parameters.Add("@Password", System.Data.SqlDbType.VarChar);
        //     cmd.Parameters.Add("@Email", System.Data.SqlDbType.VarChar);
        //     cmd.Parameters.Add("@Enabled", System.Data.SqlDbType.Bit);
        //     cmd.Parameters.Add("@Role", System.Data.SqlDbType.VarChar);
        //     cmd.Parameters.Add("@FailedLoginCount", System.Data.SqlDbType.Int);

        //     string passwordInput = password;
        //     string hashedPassword = BCrypt.Net.BCrypt.HashPassword(passwordInput, Hashing.GetRandomSalt());

        //     cmd.Parameters["@Username"].Value = username;
        //     cmd.Parameters["@Password"].Value = hashedPassword;
        //     cmd.Parameters["@Email"].Value = email;
        //     cmd.Parameters["@Enabled"].Value = 1;
        //     cmd.Parameters["@Role"].Value = role;
        //     cmd.Parameters["@FailedLoginCount"].Value = 0;

        //     rowsInserted = cmd.ExecuteNonQuery();
        //     return rowsInserted;
        // }
    }
}
