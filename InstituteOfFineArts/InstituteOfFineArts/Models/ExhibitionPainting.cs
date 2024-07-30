using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InstituteOfFineArts.Models
{
    //tranh trong triễn lãm
    public class ExhibitionPainting
    {
        public int Id { get; set; }
        public bool IsSold { get; set; } = false;//trạng thái đã bán
        public string PaintingName { get; set; } // Tên tác phẩm
        public string Description { get; set; } // Mô tả
        public string Image { get; set; } // Đường dẫn tới hình ảnh
        public double Price {get; set;}
        public bool Status { get; set; } = true; //trạng thái  hiển thị
       // public bool IsDelete { get; set; } = false; //trạng thái xóa
        public int SubmissionId { get; set; }//Khóa ngoại đến bài thi => lấy ra tranh
        public int ExhibitionId {get; set; } //Khóa ngoại đến triễn lãm
        [ForeignKey("SubmissionId")]
        public Submission Submission { get; set; }
        [ForeignKey("ExhibitionId")]
        public Exhibition Exhibition { get; set; }
    }
}
