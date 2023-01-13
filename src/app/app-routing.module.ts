import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ViewPostComponent } from './view-post/view-post.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'dasboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'view-post/:id', component: ViewPostComponent},
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard]},
  {path: 'verify-email', component: VerifyEmailComponent},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
