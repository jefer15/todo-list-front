import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './store/auth/auth.reducer';
import { tasksReducer } from './store/tasks/tasks.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { TasksEffects } from './store/tasks/tasks.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ auth: authReducer, tasks: tasksReducer }),
    provideEffects([AuthEffects, TasksEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
