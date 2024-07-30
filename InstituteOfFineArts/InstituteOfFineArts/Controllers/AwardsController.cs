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
    public class AwardsController : ControllerBase
    {
        private readonly InstituteOfFineArtsContext _context;

        public AwardsController(InstituteOfFineArtsContext context)
        {
            _context = context;
        }

        // GET: api/Awards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Award>>> GetAward()
        {
            return await _context.Awards.Include(a => a.User).Include(a => a.Competition).OrderByDescending(a => a.Id).ToListAsync();
        }
        [HttpGet("User/{userName}")]
        public async Task<ActionResult<IEnumerable<Award>>> GetAwardByUser(string userName)
        {
            return await _context.Awards.Include(a => a.User)
                                        .Include(a => a.Competition)
                                        .Where(a => a.User.UserName == userName)
                                        .OrderByDescending(a => a.Id)
                                        .ToListAsync();
        }

        // GET: api/Awards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Award>> GetAward(int id)
        {
            var award = await _context.Awards.Include(a => a.User).Include(a => a.Competition).FirstOrDefaultAsync(a => a.Id == id);

            if (award == null)
            {
                return NotFound();
            }

            return award;
        }
        // GET: api/Awards/Competition_Id/5
        [HttpGet("Competition_Id/{id}")]
        public async Task<ActionResult<List<Award>>> GetAwardsByCompetitionId(int id)
        {
            var awards = await _context.Awards.Include(a => a.User)
                                              .Include(a => a.Competition)
                                              .Where(a => a.CompetitionId == id)
                                              .ToListAsync();

            if (awards == null)
            {
                return NotFound();
            }

            return awards;
        }
        [HttpGet("Competition/{id}")] //lấy các bức tranh đạt giải và loại giải thưởng theo cuộc thi bất kì 
        public async Task<ActionResult<List<ExtendedAwardInfo>>> GetAwardsSubmissionByCompetitionId(int id)
        {
            var awards = await _context.Awards
                .Include(a => a.User)
                .Include(a => a.Competition)
                .Where(a => a.CompetitionId == id)
                .ToListAsync();

            if (awards == null)
            {
                return NotFound();
            }

            // Tạo danh sách mới để lưu thông tin mở rộng về giải thưởng
            var extendedAwardInfoList = new List<ExtendedAwardInfo>();

            // Lặp qua danh sách giải thưởng và lấy thông tin mở rộng
            foreach (var award in awards)
            {
                var extendedAwardInfo = new ExtendedAwardInfo
                {
                    AwardId = award.Id,
                    NameAward = award.NameAward,
                    Order = award.Order,
                    UserId = award.UserId,
                    FullName = award.User?.FullName, // Sử dụng ?. để tránh lỗi nếu User là null
                    CompetitionId = award.CompetitionId,
                    CompetitionName = award.Competition.Name,
                    Submission = null // Mặc định giá trị SubmissionInfo là null
                };

                // Kiểm tra nếu giải thưởng đã được gán cho một UserId nào đó
                if (award.User != null)
                {
                    // Lấy thông tin về bài thi nhận giải
                    var submissionInfo = await _context.Submissions
                        .Where(s => s.UserId == award.UserId && s.CompetitionId == award.CompetitionId)
                        .Select(s => new SubmissionInfo
                        {
                            Id = s.Id,
                            Name = s.Name,
                            Image = s.ImagePath
                        })
                        .FirstOrDefaultAsync();

                    extendedAwardInfo.Submission = submissionInfo;
                }

                extendedAwardInfoList.Add(extendedAwardInfo);
            }

            return extendedAwardInfoList;
        }
        [HttpGet("Submissions")] //lấy các bức tranh đạt giải và loại giải thưởng theo cuộc thi bất kì 
        public async Task<ActionResult<List<ExtendedAwardInfo>>> GetAwardsSubmissions()
        {
            var awards = await _context.Awards
                .Include(a => a.User)
                .Include(a => a.Competition)
                .Where(a => a.UserId != null)
                .ToListAsync();

            if (awards == null)
            {
                return NotFound();
            }

            // Tạo danh sách mới để lưu thông tin mở rộng về giải thưởng
            var extendedAwardInfoList = new List<ExtendedAwardInfo>();

            // Lặp qua danh sách giải thưởng và lấy thông tin mở rộng
            foreach (var award in awards)
            {
                var extendedAwardInfo = new ExtendedAwardInfo
                {
                    AwardId = award.Id,
                    NameAward = award.NameAward,
                    Order = award.Order,
                    UserId = award.UserId,
                    FullName = award.User?.FullName, // Sử dụng ?. để tránh lỗi nếu User là null
                    CompetitionId = award.CompetitionId,
                    CompetitionName = award.Competition.Name,
                    Submission = null // Mặc định giá trị SubmissionInfo là null
                };

                // Kiểm tra nếu giải thưởng đã được gán cho một UserId nào đó
                if (award.User != null)
                {
                    // Lấy thông tin về bài thi nhận giải
                    var submissionInfo = await _context.Submissions
                        .Where(s => s.UserId == award.UserId && s.CompetitionId == award.CompetitionId)
                        .Select(s => new SubmissionInfo
                        {
                            Id = s.Id,
                            Name = s.Name,
                            Image = s.ImagePath
                        })
                        .FirstOrDefaultAsync();

                    extendedAwardInfo.Submission = submissionInfo;
                }

                extendedAwardInfoList.Add(extendedAwardInfo);
            }

            return extendedAwardInfoList;
        }


        // PUT: api/Awards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAward(int id, Award award)
        {
            if (id != award.Id)
            {
                return BadRequest();
            }

            _context.Entry(award).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AwardExists(id))
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

        // POST: api/Awards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Award>> PostAward(Award award)
        {
            _context.Awards.Add(award);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAward", new { id = award.Id }, award);
        }

        // DELETE: api/Awards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAward(int id)
        {
            var award = await _context.Awards.FindAsync(id);
            if (award == null)
            {
                return NotFound();
            }

            _context.Awards.Remove(award);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AwardExists(int id)
        {
            return _context.Awards.Any(e => e.Id == id);
        }
        // Class for holding extended award information
        public class ExtendedAwardInfo
        {
            public int AwardId { get; set; }
            public string NameAward { get; set; }
            public int Order { get; set; }
            public string UserId { get; set; }
            public string FullName { get; set; }
            public int CompetitionId { get; set; }
            public string CompetitionName { get; set; }
            public SubmissionInfo Submission { get; set; }
        }

        // Class for holding submission information
        public class SubmissionInfo
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Image { get; set; }
        }
    }
}
