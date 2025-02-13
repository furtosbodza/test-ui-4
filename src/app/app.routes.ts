import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PartEditComponent } from './parts/part-edit/part-edit.component';
import { PartsComponent } from './parts/parts.component';
import { RegistComponent } from './regist/regist.component';
import { authGuard } from './shared/security/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'regist',
      component: RegistComponent
    },
    {
      path: 'parts',
      component: PartsComponent,
      canActivate: [authGuard]
    },
    { path: 'part/:id',
      component: PartEditComponent,
      canActivate: [authGuard]
    },
  ];

