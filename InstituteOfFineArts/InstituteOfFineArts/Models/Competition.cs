using System.ComponentModel.DataAnnotations.Schema;

namespace InstituteOfFineArts.Models
{
    //bảng cuộc thi
    public class Competition
    {
        public int Id { get; set; }
        public string Name { get; set; }//tên cuộc thi
        public DateTime StartDate { get; set; }  //ngày bắt đầu
        public DateTime EndDate { get; set; }//ngày kết thúc
        public string Description { get; set; }//mô tả
        public string Image { get; set; } //ảnh đại diện cuộc thi
        public bool Status { get; set; } = true; //trạng thái  hiển thị
        public bool IsDelete { get; set; } = false; //trạng thái xóa


        public string UserId { get; set; } //Khóa ngoại đến giáo viên tạo 
        [ForeignKey("UserId")]
        public User User {get; set;}
    }
}
