using TaskManagementApi.Models;

namespace TaskManagementApi.Repositories;

public interface ITodoTaskRepository
{
    Task<IEnumerable<TodoTask>> GetAllAsync();
    Task<TodoTask?> GetByIdAsync(int id);
    Task<TodoTask> CreateAsync(TodoTask task);
    Task<TodoTask?> UpdateAsync(int id, TodoTask task);
    Task<bool> DeleteAsync(int id);
}
