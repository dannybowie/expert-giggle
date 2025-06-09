import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpeakingComponent } from './speaking/speaking.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Assuming you have a RegisterComponent
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'book', component: BookComponent }, 
  { path: 'not-found', component: NotFoundComponent }, 
  { path: 'speaking', component: SpeakingComponent }, 
  { path: '**', redirectTo: 'home' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent } // Assuming you want to use the same component for registration
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}