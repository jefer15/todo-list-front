import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { login } from '../../../store/auth/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoginComponent,
        NoopAnimationsModule // 👈 Fix para Material Animations
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        provideMockStore({}) // 👈 Fix para NgRx Store
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    const form = component.loginForm;
    expect(form).toBeTruthy();
    expect(form.controls['email'].value).toBe('');
    expect(form.controls['password'].value).toBe('');
  });

  it('should toggle password visibility', () => {
    expect(component.typePassword).toBe('password');
    component.seePassword();
    expect(component.typePassword).toBe('text');
    component.seePassword();
    expect(component.typePassword).toBe('password');
  });

  it('should dispatch login action when form is valid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.loginForm.setValue({ email: 'test@test.com', password: '123456' });
    component.login();
    expect(dispatchSpy).toHaveBeenCalledWith(
      login({ email: 'test@test.com', password: '123456' })
    );
  });

  it('should not dispatch login action when form is invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.loginForm.setValue({ email: '', password: '' });
    component.login();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
