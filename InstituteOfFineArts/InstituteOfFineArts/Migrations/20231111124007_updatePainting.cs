using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InstituteOfFineArts.Migrations
{
    public partial class updatePainting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "ExhibitionPaintings",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "ExhibitionPaintings");
        }
    }
}
