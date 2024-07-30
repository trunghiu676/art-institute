using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using InstituteOfFineArts.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace InstituteOfFineArts.Data
{
    public class InstituteOfFineArtsContext : IdentityDbContext<User>
    {
        public InstituteOfFineArtsContext (DbContextOptions<InstituteOfFineArtsContext> options)
            : base(options)
        {
        }

        public DbSet<InstituteOfFineArts.Models.Award> Awards { get; set; } = default!;
        public DbSet<InstituteOfFineArts.Models.Competition> Competitions { get; set; } = default!;
        public DbSet<InstituteOfFineArts.Models.Exhibition> Exhibitions { get; set; } = default!;
        public DbSet<InstituteOfFineArts.Models.ExhibitionPainting> ExhibitionPaintings { get; set; } = default!;
        public DbSet<InstituteOfFineArts.Models.Result> Results { get; set; } = default!;
        public DbSet<InstituteOfFineArts.Models.Submission> Submissions { get; set; } = default!;

    }
}
