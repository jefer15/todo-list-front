import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RegisterComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        provideMockStore({}) // 👈 Corrige “No provider for Store!”
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form when empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should navigate to login when login() is called', () => {
    component.login();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
