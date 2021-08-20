using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BattleMapApp.Models;

namespace BattleMapApp.Data
{
    public class TokenContext : DbContext
    {
        public TokenContext (DbContextOptions<TokenContext> options)
            : base(options)
        {
        }

        public DbSet<BattleMapApp.Models.Token> Token { get; set; }
    }
}
