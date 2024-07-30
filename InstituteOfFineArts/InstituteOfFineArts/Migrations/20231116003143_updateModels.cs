using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InstituteOfFineArts.Migrations
{
    public partial class updateModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Submissions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Submissions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Exhibitions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "ExhibitionPaintings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Competitions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Exhibitions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ExhibitionPaintings");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Competitions");
        }
    }
}
