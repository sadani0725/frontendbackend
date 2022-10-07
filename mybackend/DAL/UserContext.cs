using System;
using MyBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace MyBackEnd.DAL
{
    public class UserContext : DbContext
    {     
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<User>().ToTable("user");
            base.OnModelCreating(modelbuilder);
        }   

        protected override void OnConfiguring(DbContextOptionsBuilder optionsbuilder)
        {
            base.OnConfiguring(optionsbuilder);
        }

        public DbSet<User> Users { get; set; }
    }
}

