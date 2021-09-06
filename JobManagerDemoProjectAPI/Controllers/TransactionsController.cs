using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace JobTrackerDemoProjectAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : ControllerBase
    {
        string connectionString = @"Data Source=SQL5102.site4now.net;Initial Catalog=db_a759ac_jobmanagerdb;User Id=db_a759ac_jobmanagerdb_admin;Password=FrogsApplesBug12!";

        private readonly ILogger<TransactionsController> _logger;

        public TransactionsController(ILogger<TransactionsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("/Transactions/GetTransactions")]

        public Response GetTransactions()
        {
            Response response = new Response();
            List<Transaction> transactions = new List<Transaction>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    transactions = Transaction.GetTransactions(con);
                }
                response.result = "success";
                response.message = $"{transactions.Count()} rows selected.";
                response.transactions = transactions;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpGet]
        [Route("/Transactions/GetTransactionsByCustomerId")]
        public Response GetTransactionsByCustomerId(int customerId)
        {
            Response response = new Response();
            List<Transaction> transactions = new List<Transaction>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    transactions = Transaction.GetTransactionsByCustomerId(con, customerId);
                }
                response.result = "success";
                response.message = $"{transactions.Count()} rows selected.";
                response.transactions = transactions;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpPost]
        [Route("/CreditTransactions/InsertTransaction")]
        public Response InsertTransaction([FromBody] Transaction transaction)
        {            
            Response response = new Response();
            int rowsInserted = 0;
            List<Transaction> transactions = new List<Transaction>();
            
            try
            {
                int customerId = transaction.CustomerId;
                decimal amount = transaction.Amount;
                string date = transaction.Date;
                string type = transaction.Type;
                string user = transaction.User;
                string details = transaction.Details;
                decimal balance = transaction.Balance;

                using (SqlConnection con = new SqlConnection(connectionString))
                {  
                    con.Open();
                    rowsInserted = Transaction.InsertTransaction(con, transaction);
                    // transactions = Transaction.GetTransactions(con);
                }
                response.result = "success";
                response.message = $"{rowsInserted} rows inserted.";
                response.transactions = transactions;         
            }
            catch (Exception ex)
            {
                response.result = "failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpPost]
        [Route("/CreditTransactions/MergeCustomerTransactions")]
        public Response MergeCustomersTransactions([FromBody] Transaction transaction)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Transaction> transactions = new List<Transaction>();

            int customerIdKeep = transaction.CustomerIdKeep;
            int customerIdMerge = transaction.CustomerIdMerge;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Transaction.MergeCustomersTransactions(con, transaction);
                    transactions = Transaction.GetTransactions(con);
                }

                response.result = "success";
                response.message = $"{rowsUpdated} rows updated.";
                response.transactions = transactions;
            }
            catch (Exception ex)
            {
                response.result = "failure";
                response.message = ex.Message;
            }

            return response;
        }
    }
}



