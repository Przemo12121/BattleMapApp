using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleMapApp.Models;
using Microsoft.Extensions.Logging;
using BattleMapApp.Session;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using BattleMapApp.Hubs;
using System.IO;

namespace BattleMapApp.Controllers
{
    public class SessionController : Controller
    {
        private readonly ILogger<SessionController> _logger;
        private readonly IGameSession _gameSession;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private IHubContext<SessionHub> _sessionHub;


        private const string images = "Images";
        private const string mapDir = "GameMap";
        private readonly string webRootPath;

        public SessionController(ILogger<SessionController> logger, IGameSession gameSession, 
            IWebHostEnvironment webHostEnvironment, IHubContext<SessionHub> sessionHub)
        {
            _logger = logger;
            _gameSession = gameSession;
            _webHostEnvironment = webHostEnvironment;
            webRootPath = _webHostEnvironment.WebRootPath;
            _sessionHub = sessionHub;
        }

        [HttpPost]
        public IActionResult UploadMap(IFormFile formFileMap, string fogBitmapAsString)
        {
            if(formFileMap != null && fogBitmapAsString != null)
            {
                string extension = System.IO.Path.GetExtension(formFileMap.FileName);
                string mapPath = System.IO.Path.Combine(webRootPath, images, mapDir, "map" + extension);
                string fogPath = System.IO.Path.Combine(webRootPath, images, mapDir, "fog.png");

                using (var stream = System.IO.File.Create(mapPath))
                {
                    formFileMap.CopyTo(stream);    //async copying cuts image if is too big
                }

                using (FileStream fs = new FileStream(fogPath, FileMode.Create))
                {
                    using (BinaryWriter bw = new BinaryWriter(fs))
                    {
                        byte[] data = Convert.FromBase64String(fogBitmapAsString);
                        bw.Write(data);
                        bw.Close();
                    }
                    fs.Close();
                }


                _gameSession.Game.MapImage = "~/Images/GameMap/map" + extension;
                _gameSession.Game.FogImage = "~/Images/GameMap/fog.png";

                //(add security)

                return Json(new { status = 1, scope = 1}); //<- return response in json format, which will be captured with iframe
            }
            else
            {
                return Json(new { }); //invalid files
            }
            
        }

        [HttpGet]
        public IActionResult ScaleMap(double pxPerDistance)
        {
            _gameSession.Game.PxPerDistance = pxPerDistance;

            return Json(new { status = 1,  scope = 2});
        }

        public IActionResult EnterAsGm(User newUser)
        {

            if(_gameSession.GmAccessString == newUser.AccessString)
            {
                return View("PlayerSession",
                    new Models.ConnectionInfo(newUser, _gameSession.Game));
            }
            else
            {
                return RedirectToAction("Index", "Home", new Models.ConnectionInfo(newUser, new LogMessage("Invalid game master token.")));
            }
        }

        public IActionResult EnterAsPlayer(User newUser)//below binding must be changed (split), when reentering works, but first time entering
        {
            return View("PlayerSession",
                    new Models.ConnectionInfo(newUser, _gameSession.Game));
        }
        
        public IActionResult Reload(
            [Bind("PlayerNickname, CharacterName, AccessString, IsGm, IsConnected", Prefix = "User")] User user)
        {
            return View("PlayerSession", new Models.ConnectionInfo(user, _gameSession.Game));
        }

        public IActionResult Index(IFormFile x)
        {
            return View();
        }
    }
}
