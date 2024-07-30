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
    public class SubmissionsController : ControllerBase
    {
        private readonly InstituteOfFineArtsContext _context;

        private readonly IWebHostEnvironment _environment;
        
        public SubmissionsController(InstituteOfFineArtsContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Submissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Submission>>> GetSubmissions()
        {
            return await _context.Submissions.Include(s => s.User).Include(s => s.Competition).OrderByDescending(s => s.Id).ToListAsync();
            //return await _context.Submissions.ToListAsync();
        }

        // GET: api/Submissions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Submission>> GetSubmission(int id)
        {
            var submission = await _context.Submissions.Include(s => s.User).Include(s => s.Competition).FirstOrDefaultAsync(s => s.Id == id);
            //var submission = await _context.Submissions.FindAsync(id);

            if (submission == null)
            {
                return NotFound();
            }

            return submission;
        }
        // GET: api/Submission/Competition_Id/5 - Lấy danh sách bài thi theo Cuộc thi 
        [HttpGet("Competition_Id/{id}")]
        public async Task<ActionResult<List<Submission>>> GetSubmissionsByCompetitionId(int id)
        {
            var submissions = await _context.Submissions.Include(s =>s.User)
                                              .Include(s => s.Competition)
                                              .Where(s => s.CompetitionId == id)
                                              .ToListAsync();

            if (submissions == null)
            {
                return NotFound();
            }

            return submissions;
        }
        // GET: api/Submissions/average-ratings/6 => lấy danh sách các kết quả nhóm trung bình số sao về...
        [HttpGet("average-ratings/{competitionId}")]
        public async Task<IActionResult> GetAverageRatings(int competitionId)
        {
            try
            {
                // Lấy tất cả đánh giá thuộc cuộc thi
                var ratingsInCompetition = await _context.Results
                    .Where(result => result.Submission.CompetitionId == competitionId)
                    .ToListAsync();

                // Lấy danh sách bài thi thuộc cuộc thi
                var submissionsInCompetition = await _context.Submissions
                    .Include(s => s.User)
                    .Where(submission => submission.CompetitionId == competitionId)
                    .ToListAsync();

                // Kiểm tra xem có đánh giá nào không
                if (ratingsInCompetition == null || !ratingsInCompetition.Any())
                {
                    // Trả về danh sách bài thi với AverageRating mặc định là 0
                    var resultDataWithoutRatings = submissionsInCompetition
                        .Select(submission => new
                        {
                            SubmissionId = submission.Id,
                            Name = submission.Name,
                            ImagePath = submission.ImagePath,
                            SubmissionDate = submission.SubmissionDate,
                            UserId = submission.UserId,
                            CompetitionId = submission.CompetitionId,
                            UserName = submission.User?.FullName,
                            AverageRating = 0
                        })
                        .OrderByDescending(item => item.AverageRating)
                        .ToList();

                    return Ok(resultDataWithoutRatings);
                }

                // Nhóm đánh giá theo Submission và tính số sao trung bình
                var submissionRatings = ratingsInCompetition
                    .GroupBy(result => result.SubmissionId)
                    .Select(group => new
                    {
                        SubmissionId = group.Key,
                        AverageRating = group.Average(result => result.Rating)
                    })
                    .ToList();

                // Tạo danh sách kết quả cuối cùng
                var resultData = submissionsInCompetition
                    .Select(submission => new
                    {
                        SubmissionId = submission.Id,
                        Name = submission.Name,
                        ImagePath = submission.ImagePath,
                        SubmissionDate = submission.SubmissionDate,
                        UserId = submission.UserId,
                        CompetitionId = submission.CompetitionId,
                        UserName = submission.User?.FullName,
                        // Lấy trung bình số sao hoặc mặc định là 0 nếu không có kết quả
                        AverageRating = submissionRatings
                            ?.FirstOrDefault(sr => sr.SubmissionId == submission.Id)
                            ?.AverageRating ?? 0
                    })
                    .OrderByDescending(item => item.AverageRating)
                    .ToList();

                return Ok(resultData);
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý tùy thuộc vào yêu cầu của bạn.
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        // GET: api/Submissions/ByUserName/{username}
        [HttpGet("ByUserName/{username}")]
        public async Task<ActionResult<IEnumerable<Submission>>> GetSubmissionsByUserName(string username)
        {
            // Tìm người dùng dựa trên tên đăng nhập
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Lấy danh sách các bài thi của người dùng cùng với thông tin cuộc thi
            var submissions = await _context.Submissions
                .Include(s => s.User)
                .Include(s => s.Competition)
                .Where(s => s.UserId == user.Id && !s.IsDelete)
                .OrderByDescending(s => s.Id)
                .ToListAsync();

            return submissions;
        }


        // PUT: api/Submissions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubmission(int id, Submission submission)
        {
            if (id != submission.Id)
            {
                return BadRequest();
            }

            _context.Entry(submission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubmissionExists(id))
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

        // POST: api/Submissions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Submission>> PostSubmission(Submission submission)
        {
            _context.Submissions.Add(submission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubmission", new { id = submission.Id }, submission);
        }

        // DELETE: api/Submissions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubmission(int id)
        {
            var submission = await _context.Submissions.FindAsync(id);
            if (submission == null)
            {
                return NotFound();
            }

            _context.Submissions.Remove(submission);
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
            var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "Submissions");
            var uploadPath = Path.Combine(uploadFolder, fileName);
            using (FileStream fs = System.IO.File.Create(uploadPath))
            {
                file.CopyTo(fs);
                fs.Flush();
            }
            var submission = _context.Submissions.FirstOrDefault(s => s.Id == id);
            submission.ImagePath = fileName;
            _context.Update(submission);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("Delete/{id}")] //set delete thanh false
        public async Task<IActionResult> Delete(int id)
        {
            var submission = await _context.Submissions.FindAsync(id);

            if (submission == null)
            {
                return NotFound();
            }

            submission.IsDelete = true;
            _context.SaveChanges();

            return Ok(new { Message = "Competition deactivated successfully." });
        }

        private bool SubmissionExists(int id)
        {
            return _context.Submissions.Any(e => e.Id == id);
        }
    }
}
