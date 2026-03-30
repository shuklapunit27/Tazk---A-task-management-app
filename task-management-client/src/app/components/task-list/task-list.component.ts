import { Component, OnInit, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskService } from '../../services/task.service';
import { TodoTask } from '../../models/todo-task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatCheckboxModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks = signal<TodoTask[]>([]);
  loading = signal(true);

  // Animated total — triggers CSS animation via a flag
  animateTotal = signal(false);

  totalTasks = computed(() => this.tasks().length);
  completedTasks = computed(() => this.tasks().filter(t => t.isCompleted).length);
  pendingTasks = computed(() => this.totalTasks() - this.completedTasks());
  completionPercent = computed(() => {
    const total = this.totalTasks();
    if (total === 0) return 0;
    return Math.round((this.completedTasks() / total) * 100);
  });

  // Delete confirmation state
  pendingDeleteId = signal<number | null>(null);

  constructor() {
    // Effect to trigger bounce animation whenever totalTasks changes
    effect(() => {
      this.totalTasks(); // track dependency
      this.animateTotal.set(true);
      setTimeout(() => this.animateTotal.set(false), 400);
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  toggleComplete(task: TodoTask): void {
    const updated = { ...task, isCompleted: !task.isCompleted };
    this.taskService.update(task.id, updated).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.map(t => (t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t))
        );
      },
    });
  }

  confirmDelete(id: number): void {
    if (this.pendingDeleteId() === id) {
      // Second click — actually delete
      this.taskService.delete(id).subscribe({
        next: () => {
          this.tasks.update(tasks => tasks.filter(t => t.id !== id));
          this.pendingDeleteId.set(null);
        },
      });
    } else {
      // First click — arm confirmation
      this.pendingDeleteId.set(id);
      // Auto-reset after 3 seconds
      setTimeout(() => {
        if (this.pendingDeleteId() === id) {
          this.pendingDeleteId.set(null);
        }
      }, 3000);
    }
  }
}
