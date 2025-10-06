import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  const apiUrl = `${environment.uri}/auth`;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // 👈 Fix para HttpClient
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token on login', () => {
    const mockResponse = { token: 'abc123', user: { name: 'John', email: 'john@test.com' } };

    service.login({ email: 'john@test.com', password: '1234' }).subscribe(res => {
      expect(res.token).toEqual('abc123');
      expect(localStorage.getItem('token')).toBe('abc123');
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should save user on register', () => {
    const mockUser = { id: 1, name: 'John', email: 'john@test.com' };

    service.saveUser({ name: 'John', email: 'john@test.com', password: '1234' })
      .subscribe(res => {
        expect(res).toEqual(mockUser);
      });

    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should clear token and navigate on logout', () => {
    localStorage.setItem('token', 'xyz');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
