using Microsoft.AspNetCore.Mvc;
using ToDoList.Models;
using ToDoList.Repositories;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")] // api/todo
    [ApiController]
    public class ToDoController : Controller
    {
        private readonly IRepository<ToDoItem> _repository;

        public ToDoController(IRepository<ToDoItem> repository)
        {
                       _repository = repository;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _repository.GetAllAsync();
            return Ok(items);
        }

        // GET: api/todo/7
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST: api/todo
        [HttpPost]
        public async Task<IActionResult> Create(ToDoItem item)
        {
            await _repository.AddAsync(item);
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        // PUT: api/todo/7
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ToDoItem İtem)
        {
            if (id != İtem.Id)
            {
                return BadRequest("İd Uyumsuz!");
            }
            // Veritabanında var mı kontrolü
            var existingItem = await _repository.GetByIdAsync(id);
            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.Title = İtem.Title;
            existingItem.IsCompleted = İtem.IsCompleted;

            await _repository.UpdateAsync(existingItem);
            return NoContent(); // Başarılı güncelleme içerik döndürmeye gerek yok
        }

        // DELETE: api/todo/7
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingItem = await _repository.GetByIdAsync(id);
            if (existingItem == null)
            {
                return NotFound("Bu id'ye sahip task bulunamadı!");
            }
            await _repository.DeleteAsync(id);
            return NoContent(); // Başarılı silme içerik döndürmeye gerek yok
        }
    }
}
