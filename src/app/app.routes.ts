import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { SpeakingComponent } from './speaking/speaking.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'book', component: BookComponent},
    {path: 'speaking', component: SpeakingComponent},
    {path: '**', component: NotFoundComponent}
];
