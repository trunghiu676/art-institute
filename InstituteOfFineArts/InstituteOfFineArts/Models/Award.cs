
using System.ComponentModel.DataAnnotations.Schema;

namespace InstituteOfFineArts.Models
{
    //bảng giải thưởng, lấy 4 học sinh có số sao lớn nhất trong bảng result trao giải nhất nhì 3 4 
    public class Award
    {
        public int Id { get; set; }
        public string NameAward { get; set; } //loai giai thuong(nhất - nhì -3 - 4)
        public int Order { get; set; } //thứ tự giải thưởng

        public string UserId { get; set; }//Khóa ngoại đến bảng user sinh viên
        public int CompetitionId { get; set; }//Khóa ngoại đến cuộc thi
        [ForeignKey("UserId")]
        public User User { get; set; }
        [ForeignKey("CompetitionId")]
        public Competition Competition { get; set; }
    }
}
