using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBackEnd.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        [Column ("First_Name")]
        public string FirstName { get; set; } 
        [Column ("Last_Name")]
        public string LastName { get; set; }
        [Column ("Birth")]
        public DateTime Birth { get; set; }
    }
}