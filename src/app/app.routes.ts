import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpeakingComponent } from './speaking/speaking.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'book', component: BookComponent }, 
  { path: 'not-found', component: NotFoundComponent }, 
  { path: 'speaking', component: SpeakingComponent }, 
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}