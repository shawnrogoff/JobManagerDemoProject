using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace JobTrackerDemoProjectAPI
{
    public class DiamondCenter
    {
        public int DiamondPriceId { get;set; }
        public string Shape { get; set; }
        public string Clarity { get; set; }
        public string Color { get; set; }
        public decimal Weight { get; set; }
        public int PricePerCarat { get; set; }

        public static List<DiamondCenter> GetCenterPricePerCarat(SqlConnection con, string shape, string clarity, string color, decimal weight)
        {
            // Create a list of customer objects
            List<DiamondCenter> diamondCenters = new List<DiamondCenter>();

            SqlCommand cmd = new SqlCommand("SELECT price_per_carat FROM diamond_price WHERE shape = @Shape AND clarity = @Clarity AND color = @Color AND weight = @Weight;", con);
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.Parameters.Add("@Shape", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Clarity", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Color", System.Data.SqlDbType.VarChar);
            cmd.Parameters.Add("@Weight", System.Data.SqlDbType.Float);

            cmd.Parameters["@Shape"].Value = shape;
            cmd.Parameters["@Clarity"].Value = clarity;
            cmd.Parameters["@Color"].Value = color;
            cmd.Parameters["@Weight"].Value = weight;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                // Create a new diamondCenter object to store properties inside
                DiamondCenter diamondCenter = new DiamondCenter();

                diamondCenter.PricePerCarat = Convert.ToInt32(rdr["price_per_carat"]);

                diamondCenters.Add(diamondCenter);
            }

            return diamondCenters;
        }
    }
}