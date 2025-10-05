import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectTasks = createSelector(selectTasksState, state => state.tasks);
export const selectSummary = createSelector(selectTasksState, state => state.summary);
export const selectLoading = createSelector(selectTasksState, state => state.loading);
