import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './tasks.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { TaskService } from '../../core/services/task/task.service';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) { }

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      tap(action => console.log('[Effects] loadTasks action payload:', action)), // <-- log
      mergeMap(({ status }) => {
        const resolvedStatus = status ?? 'all';
        return this.taskService.getTasks(resolvedStatus).pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error => {
            Swal.fire('Error', 'No se pudieron cargar las tareas', 'error');
            return of(TaskActions.loadTasksFailure({ error }));
          })
        );
      })
    )
  );

  loadSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadSummary),
      mergeMap(() =>
        this.taskService.getSummary().pipe(
          map(summary => TaskActions.loadSummarySuccess({ summary })),
          catchError(error => {
            Swal.fire('Error', 'No se pudo obtener el resumen de tareas', 'error');
            return of(TaskActions.loadTasksFailure({ error }));
          })
        )
      )
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTaskStatus),
      mergeMap(({ id }) =>
        this.taskService.updateStatus(id, true).pipe(
          tap(() => Swal.fire('Actualizada', 'La deuda ha sido marcada como pagada', 'success')),
          mergeMap(() => [
            TaskActions.loadTasks({ status: 'all' }),
            TaskActions.loadSummary()
          ]),
          catchError(error => {
            Swal.fire('Error', 'No se pudo actualizar la tarea', 'error');
            return of(TaskActions.loadTasksFailure({ error }));
          })
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          tap(() => Swal.fire('Eliminada', 'La deuda fue eliminada con éxito', 'success')),
          mergeMap(() => [
            TaskActions.loadTasks({ status: 'all' }),
            TaskActions.loadSummary()
          ]),
          catchError(error => {
            Swal.fire('Error', 'No se pudo eliminar la tarea', 'error');
            return of(TaskActions.loadTasksFailure({ error }));
          })
        )
      )
    )
  );
}
