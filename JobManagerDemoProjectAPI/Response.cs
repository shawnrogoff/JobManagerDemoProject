using System;
using System.Collections.Generic;

namespace JobTrackerDemoProjectAPI
{
    public class Response
    {
        public string result { get; set; }
        public string message { get; set; }
        public List<Customer> customers { get; set; }
        public List<Job> jobs { get; set; }
    }
}