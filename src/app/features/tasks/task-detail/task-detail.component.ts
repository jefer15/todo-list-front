import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task/task.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../core/models/task/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {

  task!: Task;

  private _taskService = inject(TaskService);
  private dialogRef = inject(MatDialogRef<TaskDetailComponent>);
  public data = inject<Task>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.getData(this.data.id!);
  }

  getData(id: number): void {
    this._taskService.getTaskById(id).subscribe({
      next: (data: Task) => {
        this.task = data;
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
