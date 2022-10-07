using Microsoft.EntityFrameworkCore;
using MyBackEnd.DAL;
using MyBackEnd.Models;
using MySql.Data.EntityFrameworkCore;

var allowspecificorigins = "_allowOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<UserContext>(options =>
{
    var connstring = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseMySql(connstring, ServerVersion.AutoDetect(connstring));   
});

builder.Services.AddCors(options => 
{
    options.AddPolicy(name : allowspecificorigins, policy => 
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(allowspecificorigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
