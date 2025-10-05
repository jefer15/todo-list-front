import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskSummary } from '../../models/task/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.uri}/tasks`;

  constructor(private _http: HttpClient) {}

  getTasks(status: 'all' | 'completed' | 'pending' = 'all'): Observable<Task[]> {
    const query = status === 'all' ? '' : `?status=${status}`;
    console.log('[TaskService] GET', `${this.apiUrl}${query}`); // <-- log
    return this._http.get<Task[]>(`${this.apiUrl}${query}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this._http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: boolean): Observable<Task> {
    return this._http.patch<Task>(`${this.apiUrl}/${id}/status`, status);
  }

  createTask(task: Task): Observable<Task> {
    return this._http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this._http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSummary(): Observable<TaskSummary> {
    return this._http.get<TaskSummary>(`${this.apiUrl}/summary`);
  }
}
