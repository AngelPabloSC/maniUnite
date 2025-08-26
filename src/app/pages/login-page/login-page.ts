import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  remember = false;
  showPassword = false;
  private auth = inject(AuthService);
  private router = inject(Router);

  login() {
    this.auth.login();
    this.router.navigate(['/bingo']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}