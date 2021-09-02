using BattleMapApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using BattleMapApp.Hubs;
using BattleMapApp.UsersMapping;
using BattleMapApp.Session;


namespace BattleMapApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
       private readonly IGameSession _gameSession;

        public HomeController(ILogger<HomeController> logger, IGameSession gameSession)
        {
            _logger = logger;
            _gameSession = gameSession;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult TryEnterToSession(
            [Bind("IsGm,PlayerNickname,CharacterName", Prefix = "User")] User newUser)
        {
            newUser.AccessString = newUser.PlayerNickname + newUser.CharacterName; //temporary scheme of granting access string
            if (newUser.IsGm) //checks if user is trying to log in as gm
            {
                if (_gameSession.TryAssignUserAsGm(newUser) == true) //assigns user as gm if possible, and returns result
                {
                    return RedirectToAction("EnterAsGm", "Session", newUser);
                }
                else
                {
                    return View("Index",
                        new ConnectionInfo(newUser, new LogMessage(
                           "Game Master already exists in the session. Enter as Player instead.")));
                }
            }
            else
            {
                _gameSession.AssignUserAsPlayer(newUser);
                
                //user enters to session as player
                return RedirectToAction("EnterAsPlayer", "Session", newUser);
            }
        }
        
        public IActionResult Index(ConnectionInfo info)
        {
                return View(info);
        }

        public IActionResult GmSession(ConnectionInfo xd)
        {
            xd.User = new User();
            xd.User.IsGm = true;
            xd.User.IsConnected = true;
            xd.Game = new Game();
            xd.TokensList = new List<Token>();
            return View("~/Views/Session/PlayerSession.cshtml", xd);
        }

        public IActionResult PlayerSession(ConnectionInfo xd)
        {
            xd.User = new User();
            xd.User.IsGm = false;
            xd.Game = new Game();
            return View("~/Views/Session/PlayerSession.cshtml", xd);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
