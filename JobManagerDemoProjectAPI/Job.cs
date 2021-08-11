using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace JobTrackerDemoProjectAPI
{
    public class Job
    {
        public int JobId { get; set; }
        public int CustomerId { get; set; }
        public string JobType { get; set; }
        public string Status { get; set; }
        public string Received { get; set; }
        public string Completed { get; set; }
        public string Delivered { get; set; }
        public string Details { get; set; }
        public decimal Estimate { get; set; }
        public decimal FinalPrice { get; set; }
        public string Comments { get; set; }
        public int EnvelopeNumber { get; set; }
        public string Customer { get;set; }

        // Select
        public static List<Job> GetJobs(SqlConnection con)
        {
            // Create a list of job objects
            List<Job> jobs = new List<Job>();

            SqlCommand cmd = new SqlCommand("SELECT j.jobId,j.customerId,j.job_type,j.status,j.received,j.completed,j.delivered,j.details,j.estimate,j.final_price,j.comments,j.envelope_number,(c.first_name + ' ' + c.last_name) as 'customer' FROM job j JOIN customer c ON j.customerId = c.customerId;", con);
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                // Create a new job object to store properties inside
                Job job = new Job();

                job.JobId = Convert.ToInt32(rdr["jobId"]);
                job.CustomerId = Convert.ToInt32(rdr["customerId"]);
                job.JobType = rdr["job_type"].ToString();
                job.Status = rdr["status"].ToString();
                job.Received = rdr["received"].ToString();
                job.Completed = rdr["completed"].ToString();
                job.Delivered = rdr["delivered"].ToString();
                job.Details = rdr["details"].ToString();
                job.Estimate = Convert.ToDecimal(rdr["estimate"]);
                job.FinalPrice = rdr["final_price"].ToString() == "" ? 0 : Convert.ToDecimal(rdr["final_price"]);
                job.Comments = rdr["comments"].ToString();
                job.EnvelopeNumber = Convert.ToInt32(rdr["envelope_number"]);
                job.Customer = rdr["customer"].ToString();

                jobs.Add(job);
            }

            return jobs;
        }

        // Insert
        public static int InsertJob(SqlConnection con, Job job)
        {
            int rowsInserted = 0;
            SqlCommand cmd = new SqlCommand("INSERT INTO job (customerId, job_type, status, received, completed, delivered, details, estimate, final_price, comments, envelope_number) values (@CustomerId, @JobType, @Status, @Received, @Completed, @Delivered, @Details, @Estimate, @FinalPrice, @Comments, @EnvelopeNumber)", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@CustomerId", System.Data.SqlDbType.Int);
            cmd.Parameters.Add("@JobType", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Status", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Received", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Completed", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Delivered", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Details", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Estimate", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@FinalPrice", System.Data.SqlDbType.Decimal);
            cmd.Parameters.Add("@Comments", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@EnvelopeNumber", System.Data.SqlDbType.Int);

            cmd.Parameters["@CustomerId"].Value = job.CustomerId;
            cmd.Parameters["@JobType"].Value = job.JobType;
            cmd.Parameters["@Status"].Value = job.Status;
            cmd.Parameters["@Received"].Value = job.Received;
            cmd.Parameters["@Completed"].Value = job.Completed;
            cmd.Parameters["@Delivered"].Value = job.Delivered;
            cmd.Parameters["@Details"].Value = job.Details;
            cmd.Parameters["@Estimate"].Value = job.Estimate;
            cmd.Parameters["@FinalPrice"].Value = job.FinalPrice;
            cmd.Parameters["@Comments"].Value = job.Comments;
            cmd.Parameters["@EnvelopeNumber"].Value = job.EnvelopeNumber;

            rowsInserted = cmd.ExecuteNonQuery();
            return rowsInserted;
        }

        // Update
        public static int UpdateJob(SqlConnection con, Job job)
        {
            int rowsUpdated = 0;

            SqlCommand cmd = new SqlCommand("UPDATE job SET customerId = @CustomerId, job_type = @JobType, status = @Status, received = @Received, completed = @Completed, delivered = @Delivered, details = @Details, estimate = @Estimate, final_price = @FinalPrice, comments = @Comments, envelope_number = @EnvelopeNumber WHERE jobId = @JobId", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@JobId", System.Data.SqlDbType.Int);
            cmd.Parameters.Add("@CustomerId", System.Data.SqlDbType.Int);
            cmd.Parameters.Add("@JobType", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Status", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Received", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Completed", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Delivered", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Details", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Estimate", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@FinalPrice", System.Data.SqlDbType.Decimal);
            cmd.Parameters.Add("@Comments", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@EnvelopeNumber", System.Data.SqlDbType.Int);
            
            cmd.Parameters["@JobId"].Value = job.JobId;
            cmd.Parameters["@CustomerId"].Value = job.CustomerId;
            cmd.Parameters["@JobType"].Value = job.JobType;
            cmd.Parameters["@Status"].Value = job.Status;
            cmd.Parameters["@Received"].Value = job.Received;
            cmd.Parameters["@Completed"].Value = job.Completed;
            cmd.Parameters["@Delivered"].Value = job.Delivered;
            cmd.Parameters["@Details"].Value = job.Details;
            cmd.Parameters["@Estimate"].Value = job.Estimate;
            cmd.Parameters["@FinalPrice"].Value = job.FinalPrice;
            cmd.Parameters["@Comments"].Value = job.Comments;
            cmd.Parameters["@EnvelopeNumber"].Value = job.EnvelopeNumber;

            rowsUpdated = cmd.ExecuteNonQuery();

            return rowsUpdated;
        }
        
        // Delete
        public static int DeleteJob(SqlConnection con, int jobId)
        {
            int rowsDeleted = 0;

            SqlCommand cmd = new SqlCommand("DELETE FROM job WHERE jobId = @JobId", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@JobId", System.Data.SqlDbType.Int);
            cmd.Parameters["@JobId"].Value = jobId;

            rowsDeleted = cmd.ExecuteNonQuery();

            return rowsDeleted;
        }
    }
}