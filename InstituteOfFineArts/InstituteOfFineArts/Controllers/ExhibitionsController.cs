using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InstituteOfFineArts.Data;
using InstituteOfFineArts.Models;

namespace InstituteOfFineArts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExhibitionsController : ControllerBase
    {
        private readonly InstituteOfFineArtsContext _context;
        private readonly IWebHostEnvironment _environment;

        public ExhibitionsController(InstituteOfFineArtsContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Exhibitions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exhibition>>> GetExhibitions()
        {
            return await _context.Exhibitions.Include(e => e.User).OrderByDescending(e => e.Id).ToListAsync();
        }

        // GET: api/Exhibitions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exhibition>> GetExhibition(int id)
        {
            var exhibition = await _context.Exhibitions.Include(e => e.User).FirstOrDefaultAsync(e => e.Id == id);

            if (exhibition == null)
            {
                return NotFound();
            }

            return exhibition;
        }

        // PUT: api/Exhibitions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExhibition(int id, Exhibition exhibition)
        {
            if (id != exhibition.Id)
            {
                return BadRequest();
            }

            _context.Entry(exhibition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExhibitionExists(id))
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

        // POST: api/Exhibitions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Exhibition>> PostExhibition(Exhibition exhibition)
        {
            _context.Exhibitions.Add(exhibition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExhibition", new { id = exhibition.Id }, exhibition);
        }

        // DELETE: api/Exhibitions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExhibition(int id)
        {
            var exhibition = await _context.Exhibitions.FindAsync(id);
            if (exhibition == null)
            {
                return NotFound();
            }

            _context.Exhibitions.Remove(exhibition);
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
            var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "Exhibition");
            var uploadPath = Path.Combine(uploadFolder, fileName);
            using (FileStream fs = System.IO.File.Create(uploadPath))
            {
                file.CopyTo(fs);
                fs.Flush();
            }
            var exhibition = _context.Exhibitions.FirstOrDefault(e => e.Id == id);
            exhibition.Image = fileName;
            _context.Update(exhibition);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("Delete/{id}")] //set delete thanh false
        public async Task<IActionResult> Delete(int id)
        {
            var exhibition = await _context.Exhibitions.FindAsync(id);

            if (exhibition == null)
            {
                return NotFound();
            }

            exhibition.IsDelete = true;
            _context.SaveChanges();

            return Ok(new { Message = "Competition deactivated successfully." });
        }
        private bool ExhibitionExists(int id)
        {
            return _context.Exhibitions.Any(e => e.Id == id);
        }
    }
}
