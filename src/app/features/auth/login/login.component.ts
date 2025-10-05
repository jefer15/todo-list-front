import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AuthResponse } from '../../../core/models/auth/auth.model';
import { Store } from '@ngrx/store';
import { login } from '../../../store/auth/auth.actions';
import { selectIsLoading } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  typePassword = "password";


  private _router = inject(Router);
  private fb = inject(FormBuilder);
  private store = inject(Store);

  ngOnInit(): void {
    this.constructorForm();
  }

  constructorForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    this._router.navigate(['/register'])
  }

  seePassword() {
    this.typePassword = (this.typePassword == "password") ? "text" : "password";
  }

  login() {
    if (this.loginForm.invalid) return;
    this.store.dispatch(login({ email: this.loginForm.value.email, password: this.loginForm.value.password }));
  }
}
