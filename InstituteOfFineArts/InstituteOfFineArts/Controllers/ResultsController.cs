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
    public class ResultsController : ControllerBase
    {
        private readonly InstituteOfFineArtsContext _context;

        public ResultsController(InstituteOfFineArtsContext context)
        {
            _context = context;
        }

        // GET: api/Results
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Result>>> GetResults()
        {
            return await _context.Results.Include(r => r.User).Include(r => r.Submission).OrderByDescending(r => r.Id).ToListAsync();
        }

        // GET: api/Results/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Result>> GetResult(int id)
        {
            var result = await _context.Results.Include(r => r.User).Include(r => r.Submission).FirstOrDefaultAsync(r => r.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }
        //GET: api/Results/submission/4 => lấy danh sách các kết quả do giáo viên đánh giá theo id bài thi
        [HttpGet("submission/{submissionId}")]
        public async Task<ActionResult<List<Result>>> GetResultsInSubmission(int submissionId)
        {
            var results = await _context.Results.Include(r => r.User)
                                                .Include(r => r.Submission)
                                                .Where(r => r.SubmissionId == submissionId)
                                                .ToListAsync();

            if (results == null)
            {
                return NotFound();
            }

            return results;
        }
        // GET: api/Results/average-ratings/6 => lấy danh sách các kết quả nhóm trung bình số sao về...
        [HttpGet("average-ratings/{competitionId}")]
        public async Task<IActionResult> GetAverageRatings(int competitionId)
        {
            // Lấy danh sách Kết quả thuộc cuộc thi 
            var resultsInCompetition = await _context.Results
                .Where(result => result.Submission.CompetitionId == competitionId)
                .ToListAsync();

            // Nhóm Kết quả theo Submission và tính số sao trung bình
            var submissionRatings = resultsInCompetition
                .GroupBy(result => result.SubmissionId)
                .Select(group => new
                {
                    SubmissionId = group.Key,
                    AverageRating = group.Average(result => result.Rating)
                })
                .ToList();

            // Lấy thông tin của bài thi 
            var submissionId = submissionRatings.Select(sr => sr.SubmissionId).ToList();
            var submissions = await _context.Submissions
                .Where(s => submissionId.Contains(s.Id))
                .Include(s => s.User)
                .ToListAsync();

            // Tạo danh sách kết quả cuối cùng
            var resultData = submissionRatings.Select(sr => new
            {
                SubmissionId = sr.SubmissionId,
                Name = submissions.First(s => s.Id == sr.SubmissionId).Name,
                ImagePath = submissions.First(s => s.Id == sr.SubmissionId).ImagePath,
                SubmissionDate = submissions.First(s => s.Id == sr.SubmissionId).SubmissionDate,
                UserId = submissions.First(s => s.Id == sr.SubmissionId).UserId,
                CompetitionId = submissions.First(s => s.Id == sr.SubmissionId).CompetitionId,
                UserName = submissions.First(s => s.Id == sr.SubmissionId).User.FullName,
                AverageRating = sr.AverageRating
            }).OrderByDescending(item => item.AverageRating).ToList();

            return Ok(resultData);
        }


        // PUT: api/Results/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResult(int id, Result result)
        {
            if (id != result.Id)
            {
                return BadRequest();
            }

            _context.Entry(result).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultExists(id))
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

        // POST: api/Results
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Result>> PostResult(Result result)
        {
            _context.Results.Add(result);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResult", new { id = result.Id }, result);
        }

        // DELETE: api/Results/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(int id)
        {
            var result = await _context.Results.FindAsync(id);
            if (result == null)
            {
                return NotFound();
            }

            _context.Results.Remove(result);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResultExists(int id)
        {
            return _context.Results.Any(e => e.Id == id);
        }
    }
}
