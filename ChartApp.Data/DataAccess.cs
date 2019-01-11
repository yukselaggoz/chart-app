using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ChartApp.Data
{
    public class DataAccess
    {
        public static string serverName { get; set; }
        public static string userId { get; set; }
        public static string userPwd { get; set; }
        public static string dbName { get; set; }

        public DataAccess(string sName, string uID, string uPwd, string dName)
        {
            serverName = sName;
            userId = uID;
            userPwd = uPwd;
            dbName = dName;
        }
        public DataAccess()
        {
            serverName = "localhost";
            userId = "root";
            userPwd = "yuksel25";
            dbName = "chart_db";
        }
        static string connection = "server=" + serverName + ";user id=" + userId + ";password=" + userPwd + ";persistsecurityinfo=True;database=" + dbName + ";SslMode=none";

        public string GetConnection()
        {
            return connection;
        }

        public List<DataFormat> GetData(string pName)
        {
            string procedureName = pName;
            //procedureName = "data_xy_sp";
            List<DataFormat> DataList = new List<DataFormat>();

            MySqlConnection conn = new MySqlConnection(GetConnection());
            MySqlCommand command = new MySqlCommand(procedureName, conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Connection.Open();
            MySqlDataReader dataReader = command.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                DataList.Add(new DataFormat()
                {
                    //id = dataReader.GetInt32("data_id"),
                    dataX = dataReader.GetString("data_x"),
                    dataY = dataReader.GetInt32("data_y"),
                });
            }
            dataReader.Close();

            return DataList;
        }

        public List<DataTable> GetTable() {
            List<DataTable> TableList = new List<DataTable>();

            TableList.Add(new DataTable()
            {
                spId = 1,
                spName = "data_xy_sp"
            });
            TableList.Add(new DataTable()
            {
                spId = 2,
                spName = "data_xy_sp2"
            });

            return TableList;
        }
    }
}
