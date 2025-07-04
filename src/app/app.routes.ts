import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'about', 
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  { 
    path: 'home', 
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'book', 
    loadComponent: () => import('./book/book.component').then(m => m.BookComponent)
  },
  { 
    path: 'speaking', 
    loadComponent: () => import('./speaking/speaking.component').then(m => m.SpeakingComponent)
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  { 
    path: 'blog', 
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent)
  },
  { 
    path: 'blog/:id', 
    loadComponent: () => import('./blog-post/blog-post.component').then(m => m.BlogPostComponent),
    data: { prerender: false }
  },
  { 
    path: 'not-found', 
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { path: '**', redirectTo: 'not-found' }
];