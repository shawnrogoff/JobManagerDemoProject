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
    public class JobsController : ControllerBase
    {
        string connectionString = @"Data Source=SQL5102.site4now.net;Initial Catalog=db_a759ac_jobmanagerdb;User Id=db_a759ac_jobmanagerdb_admin;Password=FrogsApplesBug12!";

        private readonly ILogger<JobsController> _logger;

        public JobsController(ILogger<JobsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("/Jobs/GetJobs")]

        public Response GetJobs()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobs(con);
                }
                response.result = "success";
                response.message = $"{jobs.Count()} rows selected.";
                response.jobs = jobs;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpGet]
        [Route("/Jobs/GetJobsByCustomerId")]

        public Response GetJobsByCustomerId(int customerId)
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsByCustomerId(con, customerId);
                }
                response.result = "success";
                response.message = $"{jobs.Count()} rows selected.";
                response.jobs = jobs;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpGet]
        [Route("/Jobs/GetJobByJobId")]

        public Response GetJobByJobId(int jobId)
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobByJobId(con, jobId);
                }
                response.result = "success";
                response.message = $"{jobs.Count()} rows selected.";
                response.jobs = jobs;
            }
            catch (Exception ex)
            {
                response.result = "Failure";
                response.message = ex.Message;
            }
            return response;
        }

        // Change this back to httpPost later
        [HttpPost]
        [Route("/Jobs/InsertJob")]
        public Response InsertJob([FromBody] Job job)
        {            
            Response response = new Response();
            int rowsInserted = 0;
            List<Job> jobs = new List<Job>();
            
            try
            {
                int customerId = job.CustomerId;
                string jobType = job.JobType;
                string status = job.Status;
                string received = job.Received;
                // string completed = job.Completed;
                // string delivered = job.Delivered;
                string details = job.Details;
                decimal estimate = job.Estimate;
                // decimal finalPrice = job.FinalPrice;
                // string comments = job.Comments;
                int envelopeNumber = job.EnvelopeNumber; 
                int textNotifications = job.TextNotifications;
                int EmailNotifications = job.EmailNotifications;          

                using (SqlConnection con = new SqlConnection(connectionString))
                {  
                    con.Open();
                    rowsInserted = Job.InsertJob(con, job);
                    jobs = Job.GetJobs(con);
                }
                response.result = "success";
                response.message = $"{rowsInserted} rows inserted.";
                response.jobs = jobs;         
            }
            catch (Exception ex)
            {
                response.result = "failure";
                response.message = ex.Message;
            }
            return response;
        }

        [HttpGet]
        [Route("/Jobs/DeleteJob")]
        public Response DeleteJob(int jobId)
        {
            Response response = new Response();
            int rowsDeleted = 0;
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsDeleted = Job.DeleteJob(con, jobId);
                    jobs = Job.GetJobs(con);
                }

                response.result = "success";
                response.message = $"{rowsDeleted} rows deleted.";
                response.jobs = jobs;
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
        [Route("/Jobs/UpdateJob")]
        public Response UpdateJob([FromBody] Job job)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Job.UpdateJob(con, job);
                    jobs = Job.GetJobs(con);
                }

                response.result = "success";
                response.message = $"{rowsUpdated} rows updated.";
                response.jobs = jobs;
            }
            catch (Exception ex)
            {
                response.result = "failure";
                response.message = ex.Message;
            }

            return response;
        }
    
        [HttpPost]
        [Route("/Jobs/UpdateJobComplete")]
        public Response UpdateJobComplete([FromBody] Job job)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Job.UpdateJob(con, job);
                    jobs = Job.GetJobs(con);
                }

                response.result = "success";
                response.message = $"{rowsUpdated} rows updated.";
                response.jobs = jobs;
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



