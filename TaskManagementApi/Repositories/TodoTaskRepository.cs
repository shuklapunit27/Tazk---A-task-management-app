using Microsoft.EntityFrameworkCore;
using TaskManagementApi.Data;
using TaskManagementApi.Models;

namespace TaskManagementApi.Repositories;

public class TodoTaskRepository : ITodoTaskRepository
{
    private readonly AppDbContext _context;

    public TodoTaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoTask>> GetAllAsync()
    {
        return await _context.TodoTasks.OrderByDescending(t => t.CreatedAt).ToListAsync();
    }

    public async Task<TodoTask?> GetByIdAsync(int id)
    {
        return await _context.TodoTasks.FindAsync(id);
    }

    public async Task<TodoTask> CreateAsync(TodoTask task)
    {
        _context.TodoTasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<TodoTask?> UpdateAsync(int id, TodoTask task)
    {
        var existing = await _context.TodoTasks.FindAsync(id);
        if (existing is null) return null;

        existing.Title = task.Title;
        existing.IsCompleted = task.IsCompleted;
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var task = await _context.TodoTasks.FindAsync(id);
        if (task is null) return false;

        _context.TodoTasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }
}
