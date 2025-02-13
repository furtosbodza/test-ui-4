import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/security/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-regist',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, FormsModule, MatFormFieldModule ],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.scss'
})
export class RegistComponent {

  authService  =  inject(AuthService);
  router  =  inject(Router);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  public onSave() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
    this.authService.register(this.form.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (err) => console.log(err)
      });
  }

}
