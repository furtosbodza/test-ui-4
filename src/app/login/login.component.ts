import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../shared/security/auth/auth.service';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { PartsService } from '../shared/service/item.service';
//import { BrowserModule } from '@angular/platform-browser';

 //and BrowserModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, CommonModule, FormsModule, MatInputModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);
  partService = inject(PartsService);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((data: any) => {
      if (this.authService.isLoggedIn()) {
        this.partService.showErrorFeedback("Sikeres belépés!");
        this.router.navigate(['/parts']);
      }
      console.log(data);
    });
  }
}
