using Microsoft.AspNetCore.Identity;

namespace InstituteOfFineArts.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public string Address { get; set; }//địa chỉ
        public DateTime BirthDate { get; set; }//ngày sinh
        public string Gender { get; set; }//giới tính
        public DateTime StartDate { get; set; }//ngày vào trường
        public string Avatar { get; set; } //ảnh đại diện
        public bool Status { get; set; } = true; //trạng thái hoạt động

    }
}
