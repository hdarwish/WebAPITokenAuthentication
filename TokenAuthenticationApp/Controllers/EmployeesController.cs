using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TokenAuthenticationApp.Controllers
{
    public class EmployeesController : ApiController
    {
        [Authorize]
        public HttpResponseMessage GetEmployees(string gender = "All")
        {
            using (sampleEntities entity = new sampleEntities())
            {
                return Request.CreateResponse(HttpStatusCode.OK, entity.Employees.ToList());
            }
        }
    }
}
