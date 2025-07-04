import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogPostComponent } from '../blog-post/blog-post.component';

@NgModule({
  declarations: [BlogComponent, BlogPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BlogComponent },
      { path: ':id', component: BlogPostComponent }
    ])
  ]
})
export class BlogModule { }