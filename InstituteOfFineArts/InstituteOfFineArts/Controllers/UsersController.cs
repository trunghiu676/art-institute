using InstituteOfFineArts.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace InstituteOfFineArts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public UsersController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IWebHostEnvironment environment)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _environment = environment;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();//lấy ra tất cả người dùng
            var adminUsers = await _userManager.GetUsersInRoleAsync("Admin");//lấy người dùng có quyền admin , return Ok(adminUsers)
            return Ok(users);
        }
        [HttpGet]
        [Route("GetUserByAdmin")] //lấy người dùng có quyền teacher 
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetUserByAdmin()
        {
            var users = await _userManager.GetUsersInRoleAsync("Admin");
            return Ok(users);
        }         
        [HttpGet]
        [Route("GetUserByTeacher")] //lấy người dùng có quyền teacher 
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetUserByTeacher()
        {
            var users = await _userManager.GetUsersInRoleAsync("Teacher");
            return Ok(users);
        } 
        [HttpGet]
        [Route("GetUserByStudent")] //lấy người dùng có quyền student 
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetUserByStudent()
        {
            var users = await _userManager.GetUsersInRoleAsync("Student");
            return Ok(users);
        }
        //lấy người dùng theo user name 
        [Authorize]
        [HttpGet("{userName}")]
        public async Task<IActionResult> GetUserByUserName(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return NotFound($"User with UserName {userName} not found");
            }

            // Customize the data you want to return
            //var userData = new
            //{
            //    UserId = user.Id,
            //    UserName = user.UserName,
            //    Email = user.Email,
            //    // Add other properties as needed
            //};

            return Ok(user);
        }
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound($"User with Id {id} not found");
            }


            return Ok(user);
        }

        [HttpPost] //login cho trang admin
        [Route("loginAdmin")]
        public async Task<IActionResult> LoginAdmin([Bind("UserName,Password")] Login account)
        {
            var user = await _userManager.FindByNameAsync(account.UserName);

            if (user != null && await _userManager.CheckPasswordAsync(user, account.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                // Kiểm tra xem vai trò có phải là "admin" hoặc "teacher" không
                if (userRoles.Contains("Admin") || userRoles.Contains("Teacher") || userRoles.Contains("Manager"))
                {
                    var authClaims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, user.UserName),
                                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            };

                    foreach (var userRole in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        userName = user.UserName,
                        id = user.Id,
                        role = userRoles

                    });
                }
                else
                {
                    // Trả về lỗi khi không có quyền admin hoặc teacher
                    return Unauthorized(new { ErrorMessage = "Không có quyền truy cập." });
                }
            }

            return Unauthorized(new { ErrorMessage = "Tên đăng nhập hoặc mật khẩu không đúng." });

        }
        [HttpPost] //login cho trang user
        [Route("loginUser")]
        public async Task<IActionResult> LoginUser([Bind("UserName,Password")] Login account)
        {
            var user = await _userManager.FindByNameAsync(account.UserName);

            if (user != null && await _userManager.CheckPasswordAsync(user, account.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                // Kiểm tra xem vai trò có phải là "Student" hoặc "User" không
                if (userRoles.Contains("Student") || userRoles.Contains("User") )
                {
                    var authClaims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, user.UserName),
                                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            };

                    foreach (var userRole in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        userName = user.UserName,
                        id = user.Id,
                        role = userRoles
                    });
                }

            }

            return Unauthorized(new { ErrorMessage = "Tên đăng nhập hoặc mật khẩu không đúng." });

        }

        [HttpPost]
        //[Authorize(Roles ="Admin")]
        [Route("register-user")]
        public async Task<IActionResult> Register([FromBody] User user, string password)
        {
            //kiểm tra người dùng đã tồn tại hay chưa
            var userExists = await _userManager.FindByNameAsync(user.UserName);
            if (userExists != null)
            {
                return BadRequest(new { error = "Tên người dùng đã tồn tại." });
            }
            User newUser = new User()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = user.Email,
                UserName = user.UserName,
                FullName = user.FullName,
                NormalizedEmail = user.Email,
                Status = true,
            };

            var result = await _userManager.CreateAsync(newUser, password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { Errors = errors });
            }

            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));
            //kiểm tra vai trò "Admin" đã tồn tại sau khi đã tạo. Nếu tồn tại, gán vai trò "Admin" cho người dùng mới được tạo
            if (await _roleManager.RoleExistsAsync("User"))
            {
                await _userManager.AddToRoleAsync(newUser, "User");
            }

            return Ok();
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] User user, string password)
        {
            //kiểm tra người dùng đã tồn tại hay chưa
            var userExists = await _userManager.FindByNameAsync(user.UserName);
            if (userExists != null)
            {
                return BadRequest(new { error = "Tên người dùng đã tồn tại." });
            }
            User newUser = new User()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = user.Email,
                UserName = user.UserName,
                FullName = user.FullName,
                NormalizedEmail = user.Email,
                BirthDate = user.BirthDate,
                Gender = user.Gender,
                StartDate = user.StartDate,
                Avatar = user.Avatar,
                Status = true,
                PhoneNumber = user.PhoneNumber,
            };

            var result = await _userManager.CreateAsync(newUser, password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { Errors = errors });
            }
            //kiểm tra xem vai trò "Admin" đã tồn tại trong hệ thống chưa, nếu chưa tiến hành tạo mới admin role 
            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole("Admin"));

            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));
            //kiểm tra vai trò "Admin" đã tồn tại sau khi đã tạo. Nếu tồn tại, gán vai trò "Admin" cho người dùng mới được tạo
            if (await _roleManager.RoleExistsAsync("Admin"))
            {
                await _userManager.AddToRoleAsync(newUser, "Admin");
            }

            return Ok();
        }
        [HttpPost]
        [Route("register-manager")]
        public async Task<IActionResult> RegisterManager([FromBody] User user, string password)
        {
            var userExists = await _userManager.FindByNameAsync(user.UserName);
            if (userExists != null)
            {
                return BadRequest(new { error = "Tên người dùng đã tồn tại." });
            }
            User newUser = new User()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = user.Email,
                UserName = user.UserName,
                FullName = user.FullName,
                NormalizedEmail = user.Email,
                BirthDate = user.BirthDate,
                Gender = user.Gender,
                StartDate = user.StartDate,
                Avatar = user.Avatar,
                Status = true,
                PhoneNumber = user.PhoneNumber,
            };

            var result = await _userManager.CreateAsync(newUser, password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { Errors = errors });
            }
            if (!await _roleManager.RoleExistsAsync("Manager"))
                await _roleManager.CreateAsync(new IdentityRole("Manager"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Manager"))
            {
                await _userManager.AddToRoleAsync(newUser, "Manager");
            }

            return Ok();
        }
        [HttpPost]
        [Route("register-teacher")]
        public async Task<IActionResult> RegisterTeacher([FromBody] User user, string password)
        {
            var userExists = await _userManager.FindByNameAsync(user.UserName);
            if (userExists != null)
            {
                return BadRequest(new { error = "Tên người dùng đã tồn tại." });
            }
            User newUser = new User()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = user.Email,
                UserName = user.UserName,
                FullName = user.FullName,
                NormalizedEmail = user.Email,
                BirthDate = user.BirthDate,
                Gender = user.Gender,
                StartDate = user.StartDate,
                Avatar = user.Avatar,
                Status = true,
                PhoneNumber = user.PhoneNumber,
            };

            var result = await _userManager.CreateAsync(newUser, password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { Errors = errors });
            }
            if (!await _roleManager.RoleExistsAsync("Teacher"))
                await _roleManager.CreateAsync(new IdentityRole("Teacher"));

            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Teacher"))
            {
                await _userManager.AddToRoleAsync(newUser, "Teacher");
            }

            return Ok();
        }
        [HttpPost]
        [Route("register-student")]
        public async Task<IActionResult> RegisterStudent([FromBody] User user, string password)
        {
            var userExists = await _userManager.FindByNameAsync(user.UserName);
            if (userExists != null)
            {
                return BadRequest(new { error = "Tên người dùng đã tồn tại." });
            }
            User newUser = new User()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = user.Email,
                UserName = user.UserName,
                FullName = user.FullName,
                NormalizedEmail = user.Email,
                BirthDate = user.BirthDate,
                Gender = user.Gender,
                StartDate = user.StartDate,
                Avatar = user.Avatar,
                Status = true,
                PhoneNumber = user.PhoneNumber,
            };

            var result = await _userManager.CreateAsync(newUser, password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { Errors = errors });
            }

            if (!await _roleManager.RoleExistsAsync("Student"))
                await _roleManager.CreateAsync(new IdentityRole("Student"));

            if (await _roleManager.RoleExistsAsync("Student"))
            {
                await _userManager.AddToRoleAsync(newUser, "Student");
            }

            return Ok();
        }


        //[HttpDelete("{userName}")]
        //public async Task<IActionResult> DeleteUser(string userName)
        //{
        //    var user = await _userManager.FindByNameAsync(userName);
        //    if (user == null)
        //    {
        //        return NotFound(); // Trả về mã lỗi 404 nếu không tìm thấy người dùng
        //    }
        //    var result = await _userManager.DeleteAsync(user);
        //    if (result.Succeeded)
        //    {
        //        return NoContent(); // Trả về mã lỗi 204 khi xóa thành công
        //    }
        //    return BadRequest(result.Errors); // Trả về mã lỗi 400 nếu có lỗi trong quá trình xóa
        //}
        [HttpPut("Delete/{id}")] //Xóa người dùng theo Id(set Status thành false)
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Status = false;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User deactivated successfully." });
            }

            return BadRequest(result.Errors);
        }
        [HttpPut("{userName}")]  //cập nhật thông tin theo userName
        public async Task<IActionResult> UpdateUser(string userName, [FromBody] User updatedUser)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin user
            user.UserName = updatedUser.UserName;
            user.FullName = updatedUser.FullName;
            user.Address = updatedUser.Address;
            user.BirthDate = updatedUser.BirthDate;
            user.Gender = updatedUser.Gender;
            user.StartDate = updatedUser.StartDate;
            user.Avatar = updatedUser.Avatar;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.Gender = updatedUser.Gender;
            //cập nhật mật khẩu...
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }
        [HttpPut("ChangePassword/{userName}")] //Hàm đổi mật khẩu 
        public async Task<IActionResult> ChangePassword(string userName, string oldPassword, string newPassword)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return NotFound();
            }

            // Kiểm tra mật khẩu hiện tại
            var isOldPasswordCorrect = await _userManager.CheckPasswordAsync(user, oldPassword);

            if (!isOldPasswordCorrect)
            {
                return BadRequest("Mật khẩu cũ không chính xác.");
            }

            // Đổi mật khẩu mới
            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            if (result.Succeeded)
            {
                return Ok("Đã đổi mật khẩu.");
            }

            return BadRequest(result.Errors);
        }
        [HttpPost]
        [Route("upload/{userName}")]//up load ảnh đại diện 
        public async Task<IActionResult> UploadAvatar(string userName)
        {
            var file = Request.Form.Files[0];
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var fileName = userName + Path.GetExtension(file.FileName);
            var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "Avatar");
            var uploadPath = Path.Combine(uploadFolder, fileName);

            using (FileStream fs = System.IO.File.Create(uploadPath))
            {
                file.CopyTo(fs);
                fs.Flush();
            }

            var user = _userManager.FindByNameAsync(userName.ToString()).Result;

            if (user == null)
            {
                return NotFound($"User with userName {userName} not found");
            }

            user.Avatar = fileName;
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }
    }

}
