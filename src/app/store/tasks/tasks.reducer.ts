import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './tasks.actions';
import { Task, TaskSummary } from '../../core/models/task/task.model';

export interface TasksState {
  tasks: Task[];
  summary: TaskSummary | null;
  loading: boolean;
  error: any | null;
}

export const initialState: TasksState = {
  tasks: [],
  summary: null,
  loading: false,
  error: null
};

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({ ...state, loading: true })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks, loading: false })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(TaskActions.loadSummarySuccess, (state, { summary }) => ({ ...state, summary }))
);
