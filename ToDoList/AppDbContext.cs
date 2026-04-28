using Microsoft.EntityFrameworkCore;

namespace ToDoList
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        public DbSet<Models.ToDoItem> ToDoItems { get; set; }
    }
}
