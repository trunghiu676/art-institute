using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InstituteOfFineArts.Data;
using InstituteOfFineArts.Models;
using Microsoft.Extensions.Hosting;

namespace InstituteOfFineArts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExhibitionPaintingsController : ControllerBase
    {
        private readonly InstituteOfFineArtsContext _context;

        private readonly IWebHostEnvironment _environment;

        public ExhibitionPaintingsController(InstituteOfFineArtsContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }


        // GET: api/ExhibitionPaintings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExhibitionPainting>>> GetExhibitionPaintings()
        {
            return await _context.ExhibitionPaintings.Include(e => e.Submission)
                                                     .Include(e => e.Exhibition)
                                                     .OrderByDescending(e => e.Id)
                                                     .ToListAsync();
        }

        // GET: api/ExhibitionPaintings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExhibitionPainting>> GetExhibitionPainting(int id)
        {
            var exhibitionPainting = await _context.ExhibitionPaintings.Include(e => e.Submission)
                                                                       .Include(e => e.Exhibition)
                                                                       .FirstOrDefaultAsync(e => e.Id == id);

            if (exhibitionPainting == null)
            {
                return NotFound();
            }

            return exhibitionPainting;

        } // GET: api/ExhibitionPaintings/5 => Lấy danh sách các bức tranh theo id triễn lãm
        [HttpGet("ExhibitionId/{id}")]
        public async Task<ActionResult<List<ExhibitionPainting>>> GetPaintingsInExhibition(int id)
        {
            var exhibitionPaintings = await _context.ExhibitionPaintings.Include(e => e.Submission)
                                                                       .Include(e => e.Exhibition)
                                                                       .Where(e => e.ExhibitionId == id)
                                                                       .ToListAsync();

            if (exhibitionPaintings == null)
            {
                return NotFound();
            }

            return exhibitionPaintings;
        }

        // PUT: api/ExhibitionPaintings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExhibitionPainting(int id, ExhibitionPainting exhibitionPainting)
        {
            if (id != exhibitionPainting.Id)
            {
                return BadRequest();
            }

            _context.Entry(exhibitionPainting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExhibitionPaintingExists(id))
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

        // POST: api/ExhibitionPaintings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ExhibitionPainting>> PostExhibitionPainting(ExhibitionPainting exhibitionPainting)
        {
            _context.ExhibitionPaintings.Add(exhibitionPainting);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExhibitionPainting", new { id = exhibitionPainting.Id }, exhibitionPainting);
        }

        // DELETE: api/ExhibitionPaintings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExhibitionPainting(int id)
        {
            var exhibitionPainting = await _context.ExhibitionPaintings.FindAsync(id);
            if (exhibitionPainting == null)
            {
                return NotFound();
            }

            _context.ExhibitionPaintings.Remove(exhibitionPainting);
            await _context.SaveChangesAsync();

            return NoContent();
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
            var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "Painting");
            var uploadPath = Path.Combine(uploadFolder, fileName);
            using (FileStream fs = System.IO.File.Create(uploadPath))
            {
                file.CopyTo(fs);
                fs.Flush();
            }
            var paingting = _context.ExhibitionPaintings.FirstOrDefault(p => p.Id == id);
            paingting.Image = fileName;
            _context.Update(paingting);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ExhibitionPaintingExists(int id)
        {
            return _context.ExhibitionPaintings.Any(e => e.Id == id);
        }
    }
}
