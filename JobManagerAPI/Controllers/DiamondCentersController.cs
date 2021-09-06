using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace JobManagerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DiamondCentersController : ControllerBase
    {
        string connectionString = @"Data Source=SQL5102.site4now.net;Initial Catalog=db_a759ac_jobmanagerdb;User Id=db_a759ac_jobmanagerdb_admin;Password=FrogsApplesBug12!";

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
                response.Result = "success";
                response.Message = $"{diamondCenters.Count()} rows selected.";
                response.DiamondCenters = diamondCenters;
            }
            catch (Exception ex)
            {
                response.Result = "Failure";
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
