import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Importar Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  loading = signal(false);
  error = signal<string | null>(null);
  showPassword = signal(false);
  rememberMe = signal(false);

  constructor(private router: Router) { }

  async onSubmit(): Promise<void> {
    this.error.set(null);

    if (!this.username() || !this.password()) {
      this.error.set('Por favor completa todos los campos');
      return;
    }

    this.loading.set(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Login exitoso:', {
        username: this.username(),
        rememberMe: this.rememberMe()
      });
    } catch (error) {
      console.error('Error en login:', error);
      this.error.set('Usuario o contraseña incorrectos');
    } finally {
      this.loading.set(false);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }

  onForgotPassword(): void {
    console.log('Recuperar contraseña');
  }

  onRegister(): void {
    console.log('Ir a registro');
  }
}
