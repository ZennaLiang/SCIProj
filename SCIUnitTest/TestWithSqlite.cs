using API.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;


namespace SCIUnitTest
{
    public abstract class TestWithSqlite : IDisposable
    {
        private const string ConnectionString = "DataSource=:memory:";
        private readonly SqliteConnection _connection;

        protected readonly DataContext Context;

        protected TestWithSqlite()
        {
            _connection = new SqliteConnection(ConnectionString);
            _connection.Open();
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseSqlite(_connection)
                .Options;
            Context = new DataContext(options);
            Context.Database.EnsureCreated();
        }

        public void Dispose()
        {
            _connection.Close();
        }
    }
}