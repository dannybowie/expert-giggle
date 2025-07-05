import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'book', loadComponent: () => import('./book/book.component').then(m => m.BookComponent) },
  { path: 'speaking', loadComponent: () => import('./speaking/speaking.component').then(m => m.SpeakingComponent) },
  { path: 'gallery', loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'newsletter', loadComponent: () => import('./newsletter/newsletter.component').then(m => m.NewsletterComponent) },
  { 
    path: 'profile', 
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'blog', 
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'blog/:id', 
    loadComponent: () => import('./blog-post/blog-post.component').then(m => m.BlogPostComponent),
    canActivate: [AuthGuard]
  },
  { path: 'not-found', loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: '**', redirectTo: 'not-found' }
];