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
    public class CustomersController : ControllerBase
    {
        string connectionString = @"Data Source=SQL5102.site4now.net;Initial Catalog=db_a759ac_jobmanagerdb;User Id=db_a759ac_jobmanagerdb_admin;Password=FrogsApplesBug12!";

        private readonly ILogger<CustomersController> _logger;

        public CustomersController(ILogger<CustomersController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("/Customers/GetCustomers")]

        public Response GetCustomers()
        {
            Response response = new Response();
            List<Customer> customers = new List<Customer>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    customers = Customer.GetCustomers(con);
                }
                response.result = "success";
                response.message = $"{customers.Count()} rows selected.";
                response.customers = customers;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpGet]
        [Route("/Customers/GetActiveCustomers")]

        public Response GetActiveCustomers()
        {
            Response response = new Response();
            List<Customer> customers = new List<Customer>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    customers = Customer.GetActiveCustomers(con);
                }
                response.result = "success";
                response.message = $"{customers.Count()} rows selected.";
                response.customers = customers;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpGet]
        [Route("/Customers/GetInactiveCustomers")]

        public Response GetInactiveCustomers()
        {
            Response response = new Response();
            List<Customer> customers = new List<Customer>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    customers = Customer.GetInactiveCustomers(con);
                }
                response.result = "success";
                response.message = $"{customers.Count()} rows selected.";
                response.customers = customers;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }
        
        [HttpGet]
        [Route("/Customers/GetCustomerByCustomerId")]
        public Response GetCustomerByCustomerId(int customerId)
        {
            Response response = new Response();
            List<Customer> customers = new List<Customer>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    customers = Customer.GetCustomerByCustomerId(con, customerId);
                }
                response.result = "success";
                response.message = $"{customers.Count()} rows selected.";
                response.customers = customers;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpGet]
        [Route("/Customers/GetCreditBalanceByCustomerId")]
        public Response GetCreditBalanceByCustomerId(int customerId)
        {
            Response response = new Response();
            List<Customer> customers = new List<Customer>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    customers = Customer.GetCreditBalanceByCustomerId(con, customerId);
                }
                response.result = "success";
                response.message = $"{customers.Count()} rows selected.";
                response.customers = customers;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpPost]
        [Route("/Customers/InsertCustomer")]
        public Response InsertCustomer([FromBody] Customer customer)
        {            
            Response response = new Response();
            int rowsInserted = 0;
            List<Customer> customers = new List<Customer>();
            
            try
            {
                string firstName = customer.FirstName;
                string lastName = customer.LastName;
                string phone = customer.Phone;
                string email = customer.Email;
                string address1 = customer.Address1;
                string address2 = customer.Address2;
                string city = customer.City;
                string state = customer.State;
                string zipcode = customer.Zipcode;
                string status = customer.Status;
                string comments = customer.Comments;
                decimal creditBalance = customer.CreditBalance;

                using (SqlConnection con = new SqlConnection(connectionString))
                {  
                    con.Open();
                    rowsInserted = Customer.InsertCustomer(con, customer);
                    customers = Customer.GetCustomers(con);
                }
                response.result = "success";
                response.message = $"{rowsInserted} rows inserted.";
                response.customers = customers;         
            }
            catch (Exception ex)
            {
                response.result = "failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpPost]
        [Route("/Customers/InactivateCustomer")]
        public Response InactivateCustomer([FromBody] Customer customer)
        {
            Response response = new Response();
            int rowsDeleted = 0;
            List<Customer> customers = new List<Customer>();

            int customerId = customer.CustomerId;
            string comments = customer.Comments;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsDeleted = Customer.InactivateCustomer(con, customer);
                    customers = Customer.GetCustomers(con);
                }

                response.result = "success";
                response.message = $"{rowsDeleted} rows deleted.";
                response.customers = customers;
            }
            catch (Exception ex)
            {
                response.result = "failure";
                response.message = ex.Message;
            }

            return response;
        }
        // Change this back to a Post later
        
        [HttpPost]
        [Route("/Customers/UpdateCustomer")]
        public Response UpdateCustomer([FromBody] Customer customer)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Customer> customers = new List<Customer>();

            int customerId = customer.CustomerId;
            string firstName = customer.FirstName;
            string lastName = customer.LastName;
            string phone = customer.Phone;
            string email = customer.Email;
            string address1 = customer.Address1;
            string address2 = customer.Address2;
            string city = customer.City;
            string state = customer.State;
            string zipcode = customer.Zipcode;
            string status = customer.Status;
            string comments = customer.Comments;
            decimal creditBalance = customer.CreditBalance;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Customer.UpdateCustomer(con, customer);
                    customers = Customer.GetCustomers(con);
                }

                response.result = "success";
                response.message = $"{rowsUpdated} rows updated.";
                response.customers = customers;
            }
            catch (Exception ex)
            {
                response.result = "failure";
                response.message = ex.Message;
            }

            return response;
        }

        [HttpPost]
        [Route("/Customers/MergeCustomers")]
        public Response MergeCustomers([FromBody] Customer customer)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Customer> customers = new List<Customer>();

            int customerIdKeep = customer.CustomerIdKeep;
            int customerIdMerge = customer.CustomerIdMerge;
            

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Customer.MergeCustomers(con, customer);
                    customers = Customer.GetCustomers(con);
                }

                response.result = "success";
                response.message = $"{rowsUpdated} rows updated.";
                response.customers = customers;
            }
            catch (Exception ex)
            {
                response.result = "failure";
                response.message = ex.Message;
            }

            return response;
        }

        [HttpPost]
        [Route("/Customers/MergeCustomerBalances")]
        public Response MergeCustomerBalances([FromBody] Customer customer)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Customer> customers = new List<Customer>();

            int customerIdKeep = customer.CustomerIdKeep;
            int customerIdMerge = customer.CustomerIdMerge;
            

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Customer.MergeCustomerBalances(con, customer);
                    customers = Customer.GetCustomers(con);
                }

                response.result = "success";
                response.message = $"{rowsUpdated} rows updated.";
                response.customers = customers;
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



