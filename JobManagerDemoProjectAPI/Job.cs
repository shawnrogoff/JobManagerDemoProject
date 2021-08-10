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
        public DateTime Received { get; set; }
        public DateTime Completed { get; set; }
        public DateTime Delivered { get; set; }
        public string Details { get; set; }
        public decimal Estimate { get; set; }
        public decimal FinalPrice { get; set; }
        public string Comments { get; set; }

        // Figure out this image thing
        public string Image { get; set; }

        // Select
        public static List<Job> GetJobs(SqlConnection con)
        {
            // Create a list of job objects
            List<Job> jobs = new List<Job>();

            SqlCommand cmd = new SqlCommand("SELECT jobId, customerId, job_type, status, received, completed, delivered, details, estimate, final_price, comments, image FROM job", con);
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                // Create a new job object to store properties inside
                Job job = new Job();

                job.JobId = Convert.ToInt32(rdr["JobId"]);
                job.CustomerId = Convert.ToInt32(rdr["CustomerId"]);
                job.JobType = rdr["Job_type"].ToString();
                job.Status = rdr["Phone"].ToString();
                job.Received = Convert.ToDateTime(rdr["Received"]);
                job.Completed = Convert.ToDateTime(rdr["Completed"]);
                job.Delivered = Convert.ToDateTime(rdr["Delivered"]);
                job.Details = rdr["Details"].ToString();
                job.Estimate = Convert.ToDecimal(rdr["Estimate"]);
                job.FinalPrice = Convert.ToDecimal(rdr["FinalPrice"]);
                job.Comments = rdr["Comments"].ToString();

                // Figure this out later
                job.Image = rdr["Image"].ToString();

                jobs.Add(job);
            }

            return jobs;
        }

        // Insert
        public static int InsertJob(SqlConnection con, Job job)
        {
            int rowsInserted = 0;
            SqlCommand cmd = new SqlCommand("INSERT INTO job (customerId, job_type, status, received, completed, delivered, details, estimate, final_price, comments, image) values (@CustomerId, @JobType, @Status, @Received, @Completed, @Delivered, @Details, @Estimate, @FinalPrice, @Comments, @Image)", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@CustomerId", System.Data.SqlDbType.Int);
            cmd.Parameters.Add("@JobType", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Status", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Received", System.Data.SqlDbType.Date);
            cmd.Parameters.Add("@Completed", System.Data.SqlDbType.Date);
            cmd.Parameters.Add("@Delivered", System.Data.SqlDbType.Date);
            cmd.Parameters.Add("@Details", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Estimate", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@FinalPrice", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Comments", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Image", System.Data.SqlDbType.VarBinary);

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
            cmd.Parameters["@Image"].Value = job.Image;

            rowsInserted = cmd.ExecuteNonQuery();
            return rowsInserted;
        }

        // Update
        public static int UpdateJob(SqlConnection con, Job job)
        {
            int rowsUpdated = 0;

            SqlCommand cmd = new SqlCommand("UPDATE job SET customerId = @CustomerId, job_type = @JobType, status = @Status, received = @Received, completed = @Completed, delivered = @Delivered, details = @Details, estimate = @Estimate, final_price = @FinalPrice, comments = @Comments, image = @Image WHERE jobId = @JobId", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@JobId", System.Data.SqlDbType.Int);
            cmd.Parameters.Add("@CustomerId", System.Data.SqlDbType.Int);
            cmd.Parameters.Add("@JobType", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Status", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Received", System.Data.SqlDbType.Date);
            cmd.Parameters.Add("@Completed", System.Data.SqlDbType.Date);
            cmd.Parameters.Add("@Delivered", System.Data.SqlDbType.Date);
            cmd.Parameters.Add("@Details", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Estimate", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@FinalPrice", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Comments", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Image", System.Data.SqlDbType.VarBinary);
            
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
            cmd.Parameters["@Image"].Value = job.Image;

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