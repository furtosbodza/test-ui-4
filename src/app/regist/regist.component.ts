import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/security/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PartsService } from '../shared/service/item.service';


@Component({
  selector: 'app-regist',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, FormsModule, MatFormFieldModule ],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.scss'
})
export class RegistComponent {

  authService  =  inject(AuthService);
  partService = inject(PartsService);
  router =  inject(Router);

  public registForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  public onSave() {
    if (!this.registForm.valid) {
      return;
    }
    console.log(this.registForm.value);
    this.authService.register(this.registForm.value)
      .subscribe({
        next: (data: any) => {
          this.partService.showErrorFeedback("Sikeres regisztráció!");
          this.router.navigate(['/login']);
        },
        error: (err) => console.log(err)
      });
  }

  public back() {
    this.router.navigate(['/login']);
  }

}
