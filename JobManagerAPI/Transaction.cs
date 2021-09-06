using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;


namespace JobManagerAPI
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public int CustomerId { get; set; }
        public decimal Amount { get; set; }
        public string Date { get; set; }
        public string Type { get; set; }
        public string User { get; set; }
        public string Details { get; set; }

        public decimal Balance { get; set; }
        public int CustomerIdKeep { get; set; }
        public int CustomerIdMerge { get; set; }


        public static List<Transaction> GetTransactions(SqlConnection con)
        {
            // Create a list of customer objects
            List<Transaction> transactions = new List<Transaction>();

            SqlCommand cmd = new SqlCommand("SELECT transactionId, customerId, amount, date, type, [user], details FROM credit_transaction", con);
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                // Create a new customer object to store properties inside
                Transaction transaction = new Transaction();

                transaction.TransactionId = Convert.ToInt32(rdr["transactionId"]);
                transaction.CustomerId = Convert.ToInt32(rdr["customerId"]);
                transaction.Amount = Convert.ToDecimal(rdr["amount"]);
                transaction.Date = rdr["date"].ToString();
                transaction.Type = rdr["type"].ToString();
                transaction.User = rdr["user"].ToString();
                transaction.Details = rdr["details"].ToString();

                transactions.Add(transaction);
            }

            return transactions;
        }

        public static List<Transaction> GetTransactionsByCustomerId(SqlConnection con, int customerId)
        {
            // Create a list of customer objects
            List<Transaction> transactions = new List<Transaction>();

            SqlCommand cmd = new SqlCommand("SELECT transactionId, customerId, amount, date, type, [user], details FROM credit_transaction WHERE customerId = @CustomerId", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@CustomerId", System.Data.SqlDbType.Int);
            cmd.Parameters["@CustomerId"].Value = customerId;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                // Create a new customer object to store properties inside
                Transaction transaction = new Transaction();

                transaction.TransactionId = Convert.ToInt32(rdr["transactionId"]);
                transaction.CustomerId = Convert.ToInt32(rdr["customerId"]);
                transaction.Amount = Convert.ToDecimal(rdr["amount"]);
                transaction.Date = rdr["date"].ToString();
                transaction.Type = rdr["type"].ToString();
                transaction.User = rdr["user"].ToString();
                transaction.Details = rdr["details"].ToString();

                transactions.Add(transaction);
            }

            return transactions;
        }

        public static int InsertTransaction(SqlConnection con, Transaction transaction)
        {
            int rowsInserted = 0;
            SqlCommand cmd = new SqlCommand("INSERT INTO credit_transaction (customerId, amount, date, type, [user], details) VALUES (@CustomerId, @Amount, @Date, @Type, @User, @Details)", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@CustomerId", System.Data.SqlDbType.Int);
            cmd.Parameters.Add("@Amount", System.Data.SqlDbType.Decimal);
            cmd.Parameters.Add("@Date", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Type", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@User", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Details", System.Data.SqlDbType.VarChar);

            cmd.Parameters["@CustomerId"].Value = transaction.CustomerId;
            cmd.Parameters["@Amount"].Value = transaction.Amount;
            cmd.Parameters["@Date"].Value = transaction.Date;
            cmd.Parameters["@Type"].Value = transaction.Type;
            cmd.Parameters["@User"].Value = transaction.User;
            cmd.Parameters["@Details"].Value = transaction.Details;

            rowsInserted = cmd.ExecuteNonQuery();

            //Customer.UpdateCustomerBalance(con, transaction);

            return rowsInserted;
        }

        public static int MergeCustomersTransactions(SqlConnection con, Transaction transaction)
        {
            int rowsUpdated = 0;

            // SqlCommand cmd = new SqlCommand("UPDATE job SET customerId = @CustomerId, job_type = @JobType, status = @Status, received = @Received, completed = @Completed, delivered = @Delivered, details = @Details, estimate = @Estimate, final_price = @FinalPrice, comments = @Comments, envelope_number = @EnvelopeNumber, text_notifcations = @TextNotifications, email_notifications = @EmailNotifications WHERE jobId = @JobId", con);
            SqlCommand cmd = new SqlCommand("UPDATE credit_transaction SET customerId = @CustomerIdKeep WHERE customerId = @CustomerIdMerge", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@CustomerIdKeep", System.Data.SqlDbType.Int);
            cmd.Parameters.Add("@CustomerIdMerge", System.Data.SqlDbType.Int);

            cmd.Parameters["@CustomerIdKeep"].Value = transaction.CustomerIdKeep;
            cmd.Parameters["@CustomerIdMerge"].Value = transaction.CustomerIdMerge;

            rowsUpdated = cmd.ExecuteNonQuery();

            return rowsUpdated;
        }
    }
}
