using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BattleMapApp.Data;
using BattleMapApp.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace BattleMapApp.Controllers
{
    public class TokensController : Controller
    {
        private readonly TokenContext _context;
        private readonly string tokenRootPath;

        public TokensController(TokenContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            tokenRootPath = System.IO.Path.Combine(webHostEnvironment.WebRootPath, "Images", "Tokens");
        }

        // GET: Tokens
        public IActionResult Index()
        {
            if (TempData["serializedConnectionInfo"] != null)
            {
                //gets serialized connection info
                string serializedConnectionInfo = TempData["serializedConnectionInfo"].ToString();
                var connectionInfo = JsonConvert.DeserializeObject<Models.ConnectionInfo>(serializedConnectionInfo);

                //gets tokens from database
                IQueryable<Token> tokensQueried = from tokens in _context.Token
                                                  select tokens;

                connectionInfo.TokensList = new List<Token>(tokensQueried);

                return View("/Views/Session/PlayerSession.cshtml", connectionInfo);
            }
            else return View("/Views/Home/Index.cshtml", new Models.ConnectionInfo(new LogMessage("An error occured on the server side.")));
        }

/*        // GET: Tokens/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var token = await _context.Token
                .FirstOrDefaultAsync(m => m.Id == id);
            if (token == null)
            {
                return NotFound();
            }

            return View(token);
        }*/

        // GET: Tokens/Create
        public IActionResult Create()
        {
            return Json(new { status = 1, scope = "bez modelu" });
        }

        // POST: Tokens/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Image")] Token token, IFormFile formFileMap)
        {
            if (ModelState.IsValid)
            {
                var extension = System.IO.Path.GetExtension(formFileMap.FileName);
                var tokenImagePath = System.IO.Path.Combine(tokenRootPath, token.Name + extension);

                using (var stream = System.IO.File.Create(tokenImagePath))
                {
                    formFileMap.CopyTo(stream);    //async copying cuts image if is too big
                }

                token.Image = "../Images/Tokens/" + token.Name + extension;

                _context.Add(token);
                await _context.SaveChangesAsync();
                return Json(new { status = 1, scope = "udalo sie" });
            }
            return Json(new { status = 1, scope = "nie udalo sie" });
        }

        
        // GET: Tokens/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return Json(new { status = 1, scope = "nie udalo sie" });

            }

            var token = await _context.Token
                .FirstOrDefaultAsync(m => m.Id == id);
            if (token == null)
            {
                return Json(new { status = 1, scope = "nie udalo sie" });
            }

            _context.Token.Remove(token);
            await _context.SaveChangesAsync();
            return Json(new { status = 1, scope = "udalo sie" });
        }

        // POST: Tokens/Delete/5
       /* [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var token = await _context.Token.FindAsync(id);
            _context.Token.Remove(token);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
*/
        private bool TokenExists(int id)
        {
            return _context.Token.Any(e => e.Id == id);
        }
    }
}
