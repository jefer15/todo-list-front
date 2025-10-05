import { createAction, props } from '@ngrx/store';
import { Task, TaskSummary } from '../../core/models/task/task.model';

export const loadTasks = createAction('[Tasks] Load Tasks', props<{ status?: 'all' | 'completed' | 'pending' }>());

export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: Task[] }>());

export const loadTasksFailure = createAction('[Tasks] Load Tasks Failure', props<{ error: any }>());

export const deleteTask = createAction('[Tasks] Delete Task', props<{ id: number }>());
export const updateTaskStatus = createAction('[Tasks] Update Status', props<{ id: number }>());
export const loadSummary = createAction('[Tasks] Load Summary');
export const loadSummarySuccess = createAction('[Tasks] Load Summary Success', props<{ summary: TaskSummary }>());
