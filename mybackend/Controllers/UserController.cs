using Microsoft.AspNetCore.Mvc;
using MyBackEnd.DAL;
using MyBackEnd.Models;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections;

namespace MyBackEnd.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly UserContext _db;

        public UserController(UserContext db)
        {
            _db = db;
        }

        [HttpGet]
        [EnableCors("_allowOrigins")]
        public IEnumerable<User> Get()
        {
            var list = this._db.Users.ToList();
            return list;
        }

        [HttpDelete]
        [EnableCors("_allowOrigins")]
        public bool Delete(int id)
        {
            var result = false;
            var user = this._db.Users.FirstOrDefault(x => x.ID == id);
            if(user != null)
            {
                this._db.Users.Remove(user);
                this._db.SaveChanges();
                result = true;
            }   
            return result;       
        }
        
        [HttpPut]
        [EnableCors("_allowOrigins")]
        public bool Update(User _user)
        {
            var result = false;
            var user = this._db.Users.FirstOrDefault(x => x.ID == _user.ID);
            if(user != null)
            {
                user.FirstName = _user.FirstName;
                user.LastName = _user.LastName;
                user.Birth = _user.Birth;
                this._db.SaveChanges();
                result = true;
            }
            return result;
        }
        
        [HttpPost]
        [EnableCors("_allowOrigins")]
        public bool Add(User _user)
        {
            var result = false;
            if(_user != null)
            {
                this._db.Users.Add(_user);
                this._db.SaveChanges(); 
                result = true;
            }
            return result;
        }
        
    }
}
