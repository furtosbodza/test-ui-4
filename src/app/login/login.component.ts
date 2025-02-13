import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/security/auth/auth.service';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';

 //and BrowserModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
    this.router.navigate(['/parts']);
      /*
      this.authService.login(this.loginForm.value).subscribe((data: any) => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/admin']);
        }
        console.log(data);
      });*/
    
  }
}
