import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  loading: boolean = false;

  login() {
    if (!this.username || !this.password) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }
    this.loading = true;
    // Simular petición
    setTimeout(() => {
      this.loading = false;
      console.log('Login intentado', { username: this.username });
      alert(`Usuario ${this.username} autenticado (simulado)`);
    }, 800);
  }
}
