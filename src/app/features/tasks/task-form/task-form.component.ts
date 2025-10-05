import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task/task.service';
import { Task } from '../../../core/models/task/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;

  private fb = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private dialogRef = inject(MatDialogRef<TaskFormComponent>);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.constructorForm();
  }

  constructorForm() {
    this.taskForm = this.fb.group({
      title: [this.data.data ? this.data.data.title : '', Validators.required],
      description: [this.data.data ? this.data.data.description : '', Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.taskForm.invalid) return;
    const data: Task = {
      description: this.taskForm.value.description,
      title: this.taskForm.value.title,
      completed: false,
    }

    if (this.data?.action === 'edit') {
      this._taskService.updateTask(this.data.data.id, data).subscribe({
        next: () => {
          Swal.fire('Tareas', 'Tarea actualizada correctamente', 'success').then(() =>
            this.dialogRef.close(true)
          );
        }
      });
    } else {
      this._taskService.createTask(data).subscribe({
        next: () => {
          Swal.fire('Tareas', 'Tarea agregada correctamente', 'success').then(() =>
            this.dialogRef.close(true)
          );
        }
      });
    }
  }
}

