using TaskManagementApi.Models;
using TaskManagementApi.Repositories;

namespace TaskManagementApi.Services;

public class TodoTaskService : ITodoTaskService
{
    private readonly ITodoTaskRepository _repository;

    public TodoTaskService(ITodoTaskRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<TodoTask>> GetAllTasksAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<TodoTask?> GetTaskByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<TodoTask> CreateTaskAsync(TodoTask task)
    {
        task.CreatedAt = DateTime.UtcNow;
        return await _repository.CreateAsync(task);
    }

    public async Task<TodoTask?> UpdateTaskAsync(int id, TodoTask task)
    {
        return await _repository.UpdateAsync(id, task);
    }

    public async Task<bool> DeleteTaskAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}
