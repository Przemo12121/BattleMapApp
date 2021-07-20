using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleMapApp.Models
{
    public class Game
    {
        public string MapImage { get; set; }
        public string FogImage { get; set; }
        public List<string> Players { get; set; }
        public List<string> Tokens { get; set; }
        public double PxPerDistance { get; set; } = 1;
        public bool IsGridShown { get; set; } = false;
    }
}
