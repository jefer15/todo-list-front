import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { environment } from '../../../../environments/environment';
import { Task, TaskSummary } from '../../models/task/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.uri}/tasks`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTasks with correct URL', () => {
    const mockTasks: Task[] = [{ id: 1, title: 'Test', description: 'Desc', isCompleted: false }];
    service.getTasks('all').subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });
    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should call getSummary and return data', () => {
    const mockSummary: TaskSummary = { total: 3, completed: 1, pending: 2 };
    service.getSummary().subscribe(summary => {
      expect(summary).toEqual(mockSummary);
    });
    const req = httpMock.expectOne(`${apiUrl}/summary`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSummary);
  });
});
