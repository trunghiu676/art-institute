using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InstituteOfFineArts.Data;
using InstituteOfFineArts.Models;
using Microsoft.AspNetCore.Authorization;

namespace InstituteOfFineArts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class CompetitionsController : ControllerBase
    {
        private readonly InstituteOfFineArtsContext _context;
        private readonly IWebHostEnvironment _environment;

        public CompetitionsController(InstituteOfFineArtsContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Competitions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Competition>>> GetCompetitions()
        {
            return await _context.Competitions.Include(c => c.User).OrderByDescending(c => c.Id).ToListAsync();
        }

        // GET: api/Competitions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Competition>> GetCompetition(int id)
        {
            var competition = await _context.Competitions.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);

            if (competition == null)
            {
                return NotFound();
            }

            return competition;
        }
 
        // PUT: api/Competitions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompetition(int id, Competition competition)
        {
            if (id != competition.Id)
            {
                return BadRequest();
            }

            _context.Entry(competition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompetitionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Competitions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Competition>> PostCompetition(Competition competition)
        {
            _context.Competitions.Add(competition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompetition", new { id = competition.Id }, competition);
        }

        // DELETE: api/Competitions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetition(int id)
        {
            var competition = await _context.Competitions.FindAsync(id);
            if (competition == null)
            {
                return NotFound();
            }

            _context.Competitions.Remove(competition);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var competition = await _context.Competitions.FindAsync(id);

            if (competition == null)
            {
                return NotFound();
            }

            competition.IsDelete = true;
            _context.SaveChanges();

            return Ok(new { Message = "Competition deactivated successfully." });
        }

        //code upload
        [HttpPost]
        [Route("upload/{id}")]
        public async Task<IActionResult> Upload(int id)
        {
            var file = Request.Form.Files[0];
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var fileName = id + Path.GetExtension(file.FileName);
            var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "Competition");
            var uploadPath = Path.Combine(uploadFolder, fileName);
            using (FileStream fs = System.IO.File.Create(uploadPath))
            {
                file.CopyTo(fs);
                fs.Flush();
            }
            var competition = _context.Competitions.FirstOrDefault(p => p.Id == id);
            competition.Image = fileName;
            _context.Update(competition);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool CompetitionExists(int id)
        {
            return _context.Competitions.Any(e => e.Id == id);
        }
    }
}
