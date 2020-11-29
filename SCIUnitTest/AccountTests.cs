using API.Controllers;
using API.DTOs;
using API.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Security.Cryptography;
using System.Text;

namespace SCIUnitTest
{
    [TestClass]
    public class AccountTests : TestWithSqlite
    {
        private FakeTokenService fakeTokenService;
        private AccountController accountController;

        [TestInitialize()]
        public async System.Threading.Tasks.Task StartupAsync()
        {
            fakeTokenService = new FakeTokenService();
            accountController = new AccountController(Context, fakeTokenService);

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = "sam",
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$word")),
                PasswordSalt = hmac.Key
            };
            Context.Users.Add(user);
            await Context.SaveChangesAsync();
        }

        [TestMethod]
        public void Register_UserNotExist_ReturnTrue()
        {
            var user = new RegisterDto { Username = "Josh", Password = "Pa$$word" };
            var result = accountController.Register(user).Result;

            Assert.AreEqual(user.Username.ToLower(), result.Value.Username);
        }

        [TestMethod]
        public void Register_UserExist_ReturnFalse()
        {
            var newUser = new RegisterDto { Username = "Sam", Password = "Pa$$word" };
            var result = accountController.Register(newUser).Result;

            Assert.IsNull(result.Value);
        }


        [TestMethod]
        public void Login_UserCorrectNameAndPassword_ReturnTrue()
        {
            var userLogin = new LoginDto { Username = "Sam", Password = "Pa$$word" };
            var result = accountController.Login(userLogin).Result;

            Assert.AreEqual(userLogin.Username.ToLower(), result.Value.Username);
            Assert.IsNotNull(result.Value.Token);
        }

        [TestMethod]
        public void Login_UserCorrectNameAndWrongPassword_ReturnFalse()
        {
            var userLogin = new LoginDto { Username = "Sam", Password = "Pa$$" };
            var result = accountController.Login(userLogin).Result;

            Assert.IsNull(result.Value);
        }

        [TestMethod]
        public void Login_UserNotExistAndCorrectPassword_ReturnFalse()
        {
            var userLogin = new LoginDto { Username = "Samm", Password = "Pa$$word" };
            var result = accountController.Login(userLogin).Result;

            Assert.IsNull(result.Value);
        }

        [TestMethod]
        public void Login_UserNotExistAndWrongPassword_ReturnFalse()
        {
            var userLogin = new LoginDto { Username = "Samm", Password = "Pa$$" };
            var result = accountController.Login(userLogin).Result;

            Assert.IsNull(result.Value);
        }

    }

}
