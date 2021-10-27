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
    public class DiamondCentersController : ControllerBase
    {
        string connectionString = @"Data Source=SQL5102.site4now.net;Initial Catalog=db_a759ac_jobmanagerdb;User Id=db_a759ac_jobmanagerdb_admin;Password=FrogsApplesHog12!";

        private readonly ILogger<DiamondCentersController> _logger;

        public DiamondCentersController(ILogger<DiamondCentersController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("/DiamondCenters/GetCenterPricePerCarat")]
        public Response GetCenterPricePerCarat(string shape, string clarity, string color, decimal weight)
        {
            Response response = new Response();
            List<DiamondCenter> diamondCenters = new List<DiamondCenter>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    diamondCenters = DiamondCenter.GetCenterPricePerCarat(con, shape, clarity, color, weight);
                }
                response.result = "success";
                response.message = $"{diamondCenters.Count()} rows selected.";
                response.diamondCenters = diamondCenters;
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



