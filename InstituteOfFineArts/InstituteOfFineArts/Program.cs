using Microsoft.EntityFrameworkCore;
using InstituteOfFineArts.Data;
using InstituteOfFineArts.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<InstituteOfFineArtsContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("InstituteOfFineArtsContext") ?? throw new InvalidOperationException("Connection string 'InstituteOfFineArtsContext' not found.")));

// Add services to the container.
//them cai nay
// Config cho Identity
builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<InstituteOfFineArtsContext>()
                .AddDefaultTokenProviders();
// Config cho Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
// Config cho JWT
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});

//end
builder.Services.AddControllers();
//them cai nay
// Config CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});
//end
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseHttpsRedirection();

app.MapControllers();

app.UseAuthentication();

app.UseCors();

app.UseAuthorization();

app.Run();