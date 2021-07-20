using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BattleMapApp.Models
{
    public class ConnectionInfo
    {
        public ConnectionInfo()
        {
            LogMessage = new LogMessage();
            User = new User();
            Game = null;
        }
        public ConnectionInfo(Game game)
        {
            LogMessage = new LogMessage();
            User = new User();
            Game = game;
        }
        public ConnectionInfo(LogMessage logMessage)
        {
            LogMessage = logMessage;
            User = new User();
            Game = null;
        }
        public ConnectionInfo(User user, Game game)
        {
            LogMessage = new LogMessage();
            User = user;
            Game = game;
        }
        public ConnectionInfo(User user, LogMessage logMessage, Game game)
        {
            LogMessage = logMessage;
            User = user;
            Game = game;
        }
        public ConnectionInfo(User user, LogMessage logMessage)
        {
            LogMessage = logMessage;
            User = user;
            Game = null;
        }
        public LogMessage LogMessage { get; set; }
        
        [BindProperty]
        public User User { get; set; }
        public Game Game { get; set; }
        public FormFile FormFileMap { get; set; }
        public string FogBitmapAsString { get; set; }
    }
}
