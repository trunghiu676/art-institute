using System.ComponentModel.DataAnnotations.Schema;

namespace InstituteOfFineArts.Models
{
    public class Result
    {
        public int Id { get; set; }
        public int Rating { get; set; } //số sao
        public string PositivePoint { get; set; } //điểm tích cực
        public string Limitation { get; set; } //điểm hạn chế
        public string ImprovementArea { get; set; } //lĩnh vực cải tiến
      
        public string UserId { get; set; }//Khóa ngoại đến user giáo viên đánh giá
        public int SubmissionId { get; set; }//Khóa ngoại đến bài thi
        [ForeignKey("UserId")]
        public User User { get; set; }
        [ForeignKey("SubmissionId")]
        public Submission Submission { get; set; }
    }
}
