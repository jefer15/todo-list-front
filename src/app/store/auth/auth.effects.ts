import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          tap(() => Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success')),
          map(response => AuthActions.loginSuccess({ user: response.user, token: response.token })),
          catchError(error => {
            Swal.fire('Error', 'Credenciales inválidas', 'error');
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          Swal.fire({
            title: 'Bienvenido 👋',
            text: `Hola, has iniciado sesión correctamente.`,
            icon: 'success',
            confirmButtonText: 'Continuar'
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );


  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(() => {
          Swal.fire({
            title: 'Error',
            text: 'Credenciales inválidas. Por favor revisa tu correo o contraseña.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
          });
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.authService.saveUser(action.user).pipe(
          map(() => {
            Swal.fire({
              title: 'Registro exitoso 🎉',
              text: 'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
              icon: 'success',
              confirmButtonText: 'Ir al login'
            });
            this.router.navigate(['/login']);
            return AuthActions.logout();
          }),
          catchError(error => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo completar el registro. Intenta nuevamente.',
              icon: 'error'
            });
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          Swal.fire({
            title: 'Sesión cerrada 👋',
            text: 'Has salido correctamente.',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
