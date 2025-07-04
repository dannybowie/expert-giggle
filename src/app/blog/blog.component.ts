import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-post.model';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];
  canEdit = false;
  showNewPostForm = false;
  newPost = { title: '', content: '' };
  currentUser: any = null;
  accessDenied = false;

  constructor(private blogService: BlogService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser().subscribe(user => {
      this.currentUser = user;
      this.canEdit = !!(user as any)?.canEdit;
      if (!user?.isMember) {
        this.accessDenied = true;
        return;
      }
      this.blogService.getPosts().subscribe(posts => {
        this.posts = posts.map(post => ({
          ...post,
          date: post.date && post.date instanceof Timestamp
            ? post.date.toDate()
            : post.date
        }));
      });
    });
  }

  async createPost() {
    try {
      const author = this.currentUser
        ? `${this.currentUser.firstName} ${this.currentUser.lastName?.charAt(0) || ''}.`
        : 'Anonymous';
      await this.blogService.addPost({
        ...this.newPost,
        date: new Date(),
        author
      });
      this.newPost = { title: '', content: '' };
      this.showNewPostForm = false;
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }
}
