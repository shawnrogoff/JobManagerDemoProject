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
        [Route("/Jobs/GetJobsInProgress")]

        public Response GetJobsInProgress()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsInProgress(con);
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
        [Route("/Jobs/GetJobsComplete")]

        public Response GetJobsComplete()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsComplete(con);
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
        [Route("/Jobs/GetJobsDelivered")]

        public Response GetJobsDelivered()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsDelivered(con);
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
        [Route("/Jobs/GetJobsInactive")]

        public Response GetJobsInactive()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsInactive(con);
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
                    rowsUpdated = Job.MarkJobComplete(con, job);
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
        [Route("/Jobs/UpdateJobDelivered")]
        public Response UpdateJobDelivered([FromBody] Job job)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Job.MarkJobDelivered(con, job);
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
        [Route("/Jobs/InactivateJob")]
        public Response UpdateJoInactivateJobDelivered([FromBody] Job job)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Job.InactivateJob(con, job);
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
        [Route("/Jobs/MergeCustomerJobs")]
        public Response MergeCustomersJobs([FromBody] Job job)
        {
            Response response = new Response();
            int rowsUpdated = 0;
            List<Job> jobs = new List<Job>();

            int customerIdKeep = job.CustomerIdKeep;
            int customerIdMerge = job.CustomerIdMerge;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    rowsUpdated = Job.MergeCustomersJobs(con, job);
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

        // This section is for the Kanban Board

        [HttpGet]
        [Route("/Jobs/GetJobsWithQuoteStatus")]

        public Response GetJobsWithQuoteStatus()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsWithQuoteStatus(con);
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
        [Route("/Jobs/GetJobsWithCADStatus")]

        public Response GetJobsWithCADStatus()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsWithCADStatus(con);
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
        [Route("/Jobs/GetJobsWithApprovalStatus")]

        public Response GetJobsWithApprovalStatus()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsWithApprovalStatus(con);
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
        [Route("/Jobs/GetJobsWithPrintingStatus")]

        public Response GetJobsWithPrintingStatus()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsWithPrintingStatus(con);
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
        [Route("/Jobs/GetJobsWithCastingStatus")]

        public Response GetJobsWithCastingStatus()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsWithCastingStatus(con);
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
        [Route("/Jobs/GetJobsWithSettingStatus")]

        public Response GetJobsWithSettingStatus()
        {
            Response response = new Response();
            List<Job> jobs = new List<Job>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    jobs = Job.GetJobsWithSettingStatus(con);
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
    }
}