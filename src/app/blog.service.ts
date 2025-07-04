import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, query, orderBy, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BlogPost } from './blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private firestore: Firestore) {}

  getPosts(): Observable<BlogPost[]> {
    const postsRef = collection(this.firestore, 'blogPosts');
    const q = query(postsRef, orderBy('date', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<BlogPost[]>;
  }

  getPost(id: string): Observable<BlogPost | undefined> {
    const postRef = doc(this.firestore, 'blogPosts', id);
    return docData(postRef, { idField: 'id' }) as Observable<BlogPost | undefined>;
  }

  getComments(postId: string): Observable<any[]> {
    const commentsRef = collection(this.firestore, 'blogPosts', postId, 'comments');
    return collectionData(commentsRef, { idField: 'id' }) as Observable<any[]>;
  }

  addComment(postId: string, comment: any) {
    const commentsRef = collection(this.firestore, 'blogPosts', postId, 'comments');
    return addDoc(commentsRef, comment);
  }

  updatePost(postId: string, post: any) {
    const postRef = doc(this.firestore, 'blogPosts', postId);
    return updateDoc(postRef, post);
  }

  addPost(post: any) {
    const postsRef = collection(this.firestore, 'blogPosts');
    return addDoc(postsRef, post);
  }
}