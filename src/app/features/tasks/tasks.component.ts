import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { Task, TaskSummary } from '../../core/models/task/task.model';
import {
  loadTasks,
  deleteTask,
  loadSummary,
  updateTaskStatus,
} from '../../store/tasks/tasks.actions';
import { logout } from '../../store/auth/auth.actions';
import { selectTasks, selectSummary, selectLoading } from '../../store/tasks/tasks.selectors';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'user', 'actions'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  summary: TaskSummary | null = null;
  selectedFilter: 'all' | 'completed' | 'pending' = 'all';
  allTasks: Task[] = [];

  private _dialog = inject(MatDialog);
  private _store = inject(Store);

  tasks$ = this._store.select(selectTasks);
  summary$ = this._store.select(selectSummary);
  loading$ = this._store.select(selectLoading);

  ngOnInit(): void {
    console.log('[Component] dispatching loadTasks with nngoniit', this.selectedFilter);
    this._store.dispatch(loadTasks({ status: this.selectedFilter }));
    this._store.dispatch(loadSummary());
  }

  ngAfterViewInit(): void {
    this.tasks$.subscribe((tasks) => {
      this.dataSource.data = tasks;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.summary$.subscribe((summary) => {
      this.summary = summary;
    });
  }

  onFilterChange(filter: 'all' | 'completed' | 'pending'): void {
    this.selectedFilter = filter;
    console.log('[Component] dispatching loadTasks with filter', filter);
    this._store.dispatch(loadTasks({ status: filter }));
  }

  addTask(): void {
    const ref = this._dialog.open(TaskFormComponent, {
      width: '500px',
      data: { action: 'add' },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) {
        this._store.dispatch(loadTasks({ status: this.selectedFilter }));
        this._store.dispatch(loadSummary());
      }
    });
  }

  editTask(task: Task): void {
    const ref = this._dialog.open(TaskFormComponent, {
      width: '500px',
      data: { action: 'edit', data: task },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) {
        this._store.dispatch(loadTasks({ status: this.selectedFilter }));
        this._store.dispatch(loadSummary());
      }
    });
  }

  updateStatusTask(task: Task): void {
    Swal.fire({
      title: 'Tareas',
      text: '¿Marcar como completada?,Esta acción no se puede deshacer',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, completar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._store.dispatch(updateTaskStatus({ id: task.id! }));
      }
    });
  }

  viewDetail(task: Task): void {
    this._dialog.open(TaskDetailComponent, { width: '500px', data: task });
  }

  deleteTask(task: Task): void {
    Swal.fire({
      title: 'Tareas',
      text: '¿Eliminar esta tarea?, Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._store.dispatch(deleteTask({ id: task.id! }));
      }
    });
  }

  logout(): void {
    this._store.dispatch(logout());
  }
}
