using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace BattleMapApp.Models
{
    public class User
    {
        public User() { }
        public User(string playerNickname, string characterName)
        {
            PlayerNickname = playerNickname;
            CharacterName = characterName;
            AccessString = PlayerNickname + CharacterName;
        }
        public bool IsGm { get; set; } = false;
        public bool IsConnected { get; set; } = false;
        
        [StringLength(100, MinimumLength = 1)]
        [Required]
        [RegularExpression(@"^[A-Z]+[a-zA-Z\s]*$", 
            ErrorMessage = "Player's nickname is expected to be words formed with letters a-z, starting with upper case.")]
        [Display(Name = "Player's Nickname")]
        public string PlayerNickname { get; set; }

        [StringLength(100, MinimumLength = 1)]
        [Required]
        [RegularExpression(@"[a-zA-Z'\-\s]*$",
            ErrorMessage = "Character's name is expected to be words formed with letters a-z, with special characters \" ' \" and \"-\".")]
        [Display(Name = "Character's Name")]
        public string CharacterName { get; set; }
        public string AccessString { get; set; } = "";
        public void ReassignAsPlayer()
        {
            IsGm = false;
        }
    }
}
