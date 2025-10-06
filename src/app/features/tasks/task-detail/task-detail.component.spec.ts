import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { TaskService } from '../../../core/services/task/task.service';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../core/models/task/task.model';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TaskDetailComponent>>;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Task description',
    isCompleted: false,
    user: { id: 1, name: 'John', email: 'john@test.com' }
  };

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskById']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        TaskDetailComponent,
        NoopAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
        MatIconModule
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockTask }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTaskById on init', () => {
    taskServiceSpy.getTaskById.and.returnValue(of(mockTask));
    component.ngOnInit();
    expect(taskServiceSpy.getTaskById).toHaveBeenCalledWith(1);
  });

  it('should close dialog when close() is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
