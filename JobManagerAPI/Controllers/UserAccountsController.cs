using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace JobManagerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserAccountsController : ControllerBase
    {
        string connectionString = @"Data Source=SQL5102.site4now.net;Initial Catalog=db_a759ac_jobmanagerdb;User Id=db_a759ac_jobmanagerdb_admin;Password=FrogsApplesBug12!";

        private readonly ILogger<UserAccountsController> _logger;

        public UserAccountsController(ILogger<UserAccountsController> logger)
        {
            _logger = logger;
        }



        [HttpGet]
        [Route("/Users/GetUsers")]
        public Response GetUsers()
        {
            Response response = new Response();
            List<UserAccount> userAccounts = new List<UserAccount>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    // users = UserAccount.GetUsers(con);
                }
                response.Result = "success";
                response.Message = $"{userAccounts.Count()} rows selected.";
                response.UserAccounts = userAccounts;
            }
            catch (Exception ex)
            {
                response.Result = "Failure";
                response.Message = ex.Message;
            }
            return response;
        }


        // this is for manual insert of initial admin account
        // [HttpGet]
        // [Route("/Users/InsertUserManually")]
        // public Response InsertUserGet(string username, string password, string email, string role)
        // {
        //     Response response = new Response();
        //     List<UserAccount> userAccounts = new List<UserAccount>();

        //     try
        //     {
        //         using (SqlConnection con = new SqlConnection(connectionString))
        //         {
        //             con.Open();
        //             var rowsInserted = UserAccount.InsertUserGet(con, username, password, email, role);
        //         }
        //         response.Result = "success";
        //         response.Message = $"{userAccounts.Count()} rows inserted.";
        //         response.UserAccounts = userAccounts;
        //     }
        //     catch (Exception ex)
        //     {
        //         response.Result = "Failure";
        //         response.Message = ex.Message;
        //     }
        //     return response;
        // }

        [HttpGet]
        [Route("/Users/CheckForUsername")]
        public Response CheckForUsername(string username)
        {
            Response response = new Response();
            List<UserAccount> userAccounts = new List<UserAccount>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    userAccounts = UserAccount.CheckForUsername(con, username);
                }
                response.Result = "success";
                response.Message = $"{userAccounts.Count()} username match(es).";
                response.NumberResults = userAccounts.Count();
            }
            catch (Exception ex)
            {
                response.Result = "Failure";
                response.Message = ex.Message;
            }
            return response;
        }


        [HttpPost]
        [Route("/Users/CheckForUsernamePasswordMatch")]
        public Response CheckForUsernamePasswordMatch([FromBody] UserAccount userAccount)
        {
            Response response = new Response();
            List<UserAccount> userAccounts = new List<UserAccount>();
            string correctPassword = "";

            string username = userAccount.Username;
            string password = userAccount.Password;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    userAccounts = UserAccount.GetUsernameAndPasswordForValidation(con, userAccount);
                    correctPassword = UserAccount.ExtractCorrectPassword(userAccounts);

                }
                response.Result = "success";
                response.Message = UserAccount.PasswordValidation(username, password, correctPassword);
                response.UserAccounts = userAccounts;
            }
            catch (Exception ex)
            {
                response.Result = "failure";
                response.Message = ex.Message;
            }

            return response;
        }


        [HttpPost]
        [Route("/Users/InsertUser")]
        public Response InsertUser([FromBody] UserAccount user)
        {
            Response response = new Response();
            int rowsInserted = 0;
            List<UserAccount> userAccounts = new List<UserAccount>();

            try
            {
                string username = user.Username;
                string password = user.Password;
                string email = user.Email;
                int enabled = user.Enabled;
                int FailedLoginCount = user.FailedLoginCount;
                string role = user.Role;

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    // rowsInserted = UserAccount.InsertUser(con, user);
                    // users = Customer.GetCustomers(con);
                }
                response.Result = "success";
                response.Message = $"{rowsInserted} rows inserted.";
                response.UserAccounts = userAccounts;
            }
            catch (Exception ex)
            {
                response.Result = "failure";
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
