
using System.ComponentModel.DataAnnotations.Schema;

namespace InstituteOfFineArts.Models
{
    //bảng triễn lãm
    public class Exhibition
    {
        public int Id { get; set; }
        public string Name { get; set; }//tên buổi triễn lãm
        public DateTime StartDate { get; set; }//ngày bắt đầu
        public DateTime EndDate { get; set; }//ngày kết thúc
        public string Description { get; set; }//mô tả buổi triễn lãm
        public string Image { get; set; } //ảnh đại diện triễn lãm
        public bool Status { get; set; } = true; //trạng thái  hiển thị
        public bool IsDelete { get; set; } = false; //trạng thái xóa

        public string UserId { get; set; } //Khóa ngọai đến giáo viên tạo 
        [ForeignKey("UserId")]
        public User User {get; set;}
    }
}
