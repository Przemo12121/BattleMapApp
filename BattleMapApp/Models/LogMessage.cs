using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleMapApp.Models
{
    public class LogMessage
    {
        public LogMessage()
        {

        }
        public LogMessage(string text)
        {
            Text = text;
        }
        public string Text { get; set; }
    }
}
