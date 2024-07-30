using System.ComponentModel.DataAnnotations.Schema;

namespace InstituteOfFineArts.Models
{
    //bảng bài thi 
    public class Submission
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }//đường dẫn ảnh
        public string Name { get; set; }//tên bài thi
        public string Description { get; set; }//mô tả bài thi
        public string Quote { get; set; }//câu trích dẫn
        public double Price { get; set; } //giá bán nếu đạt giải 
        public DateTime SubmissionDate { get; set; } //ngày gửi
                                                     //public string Status { get; set; } //trạng thái đánh giá của giáo viên - đã đánh giá, đang đánh giá, chưa đánh giá
        public bool Status { get; set; } = true; //trạng thái  hiển thị
        public bool IsDelete { get; set; } = false; //trạng thái xóa
        public string UserId { get; set; }//Khóa ngoại đến user sinh viên
        public int CompetitionId { get; set; }//mã cuộc thi
        [ForeignKey("UserId")]
        public User User { get; set; }
        [ForeignKey("CompetitionId")]
        public Competition Competition { get; set; }

    }
}
