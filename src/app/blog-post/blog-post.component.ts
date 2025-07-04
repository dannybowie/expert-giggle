import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service'; // <-- Import your auth service

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  post: any = {};
  comments: any[] = [];
  newComment = '';
  isEditing = false;
  canEdit = false;
  currentUser: any = null;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private authService: AuthService // <-- Inject your auth service
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id')!;
    this.blogService.getPost(postId).subscribe(post => {
      this.post = post;
    });
    this.blogService.getComments(postId).subscribe(comments => {
      this.comments = comments;
    });

    // Get current user info
    this.authService.currentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  savePost() {
    const postId = this.route.snapshot.paramMap.get('id')!;
    this.blogService.updatePost(postId, this.post).then(() => {
      this.isEditing = false;
    });
  }

  addComment() {
    if (!this.newComment.trim()) return;
    const postId = this.route.snapshot.paramMap.get('id')!;
    let author = 'Anonymous';
    if (this.currentUser && this.currentUser.firstName && this.currentUser.lastName) {
      author = `${this.currentUser.firstName} ${this.currentUser.lastName.charAt(0)}.`;
    }
    this.blogService.addComment(postId, {
      author,
      text: this.newComment,
      timestamp: new Date()
    }).then(() => {
      this.newComment = '';
    });
  }
}
