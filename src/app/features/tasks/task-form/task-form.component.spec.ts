import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../../core/services/task/task.service';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import Swal from 'sweetalert2';
import { Task } from '../../../core/models/task/task.model';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TaskFormComponent>>;

  const mockDialogData = {
    action: 'add',
    data: null
  };

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask', 'updateTask']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }) as any);

    await TestBed.configureTestingModule({
      imports: [
        TaskFormComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values for add action', () => {
    expect(component.taskForm.value.title).toBe('');
    expect(component.taskForm.value.description).toBe('');
  });

  it('should call createTask on save when adding', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Mock Task',
    description: 'Testing create',
    isCompleted: false
  };
  taskServiceSpy.createTask.and.returnValue(of(mockTask));
  component.taskForm.setValue({ title: 'Task 1', description: 'Desc 1' });
  component.save();
  expect(taskServiceSpy.createTask).toHaveBeenCalled();
});

it('should call updateTask on save when editing', async () => {
  const editData = { action: 'edit', data: { id: 1, title: 'Task', description: 'Desc', isCompleted: false } };
  const mockTask: Task = { id: 1, title: 'Mock Task', description: 'Edited', isCompleted: false };

  // 🔹 Creamos un nuevo TestBed con el provider deseado antes de instanciar
  await TestBed.resetTestingModule()
    .configureTestingModule({
      imports: [
        TaskFormComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: editData }
      ]
    })
    .compileComponents();

  const newFixture = TestBed.createComponent(TaskFormComponent);
  const newComponent = newFixture.componentInstance;

  taskServiceSpy.updateTask.and.returnValue(of(mockTask));
  newComponent.constructorForm();
  newComponent.save();

  expect(taskServiceSpy.updateTask).toHaveBeenCalled();
});



  it('should close dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
