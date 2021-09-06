using JobManagerAPI.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobManagerAPI
{
    public class Response
    {
        public string Result { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public List<Customer> Customers { get; set; }
        public List<Job> Jobs { get; set; }
        public List<Transaction> Transactions { get; set; }
        public List<DiamondCenter> DiamondCenters { get; set; }
        public List<UserAccount> UserAccounts { get; set; }
        public int NumberResults { get; set; }
    }
}
