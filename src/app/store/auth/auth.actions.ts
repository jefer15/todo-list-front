import { createAction, props } from '@ngrx/store';
import { AuthResponse, User } from '../../core/models/auth/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const register = createAction(
  '[Auth] Register',
  props<{ user: { name: string; email: string; password: string } }>()
);

export const registerSuccess = createAction('[Auth] Register Success');
