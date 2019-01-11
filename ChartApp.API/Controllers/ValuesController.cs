using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ChartApp.Data;

namespace ChartApp.API.Controllers
{
    public class ValuesController : ApiController
    {
        List<DataFormat> dataList = new List<DataFormat>();
        List<DataTable> tableList = new List<DataTable>();
        string procedureName;
        string sName;
        string uID;
        string uPwd;
        string dName;

        [HttpPost]
        public IHttpActionResult GetLogin(string serverName, string userID, string userPwd, string dbName)
        {
            //sName = serverName;
            //uID = userID;
            //uPwd = userPwd;
            //dName = dbName;
            DataAccess dataAccess = new DataAccess(serverName, userID, userPwd, dbName);
            return Content(HttpStatusCode.OK, "oturum açıldı");
        }

        [HttpPost]
        public IHttpActionResult Get(string spName)
        {
            DataAccess dataAccess = new DataAccess();
            dataList = dataAccess.GetData(spName);
            return Content(HttpStatusCode.OK, dataList);
        }

        [HttpGet]
        public IHttpActionResult GetTable()
        {
            DataAccess dataAccess = new DataAccess();
            tableList = dataAccess.GetTable();
            return Content(HttpStatusCode.OK, tableList);
        }

        //// GET api/<controller>
        //public IEnumerable<string> Get()
        //{
        //    dataList = DataAccess.GetData();
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}
    }
}