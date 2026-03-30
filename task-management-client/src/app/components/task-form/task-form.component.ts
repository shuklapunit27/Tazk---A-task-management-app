import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { TodoTask } from '../../models/todo-task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  title = signal('');
  isEditMode = signal(false);
  taskId = signal<number | null>(null);
  submitting = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.taskId.set(+id);
      this.taskService.getById(+id).subscribe({
        next: (task) => this.title.set(task.title),
      });
    }
  }

  onSubmit(): void {
    const trimmedTitle = this.title().trim();
    if (!trimmedTitle) return;
    this.submitting.set(true);

    if (this.isEditMode() && this.taskId()) {
      this.taskService.getById(this.taskId()!).subscribe({
        next: (existing) => {
          const updated: TodoTask = { ...existing, title: trimmedTitle };
          this.taskService.update(this.taskId()!, updated).subscribe({
            next: () => this.router.navigate(['/']),
            error: () => this.submitting.set(false),
          });
        },
      });
    } else {
      this.taskService.create({ title: trimmedTitle, isCompleted: false }).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.submitting.set(false),
      });
    }
  }
}
