import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Post } from 'src/app/model/post';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  getPosts() {
    return this.firestore.collection('posts').valueChanges();
  }
  getPost(id: string) {
    return this.firestore.collection('posts').doc(id).valueChanges();
  }
  //Create a post and update the user's posts array
  createPost(post: Post) {
    post.id = this.firestore.createId();
    this.authService.updateUserPosts(post);

    return this.firestore.collection('posts').doc(post.id).set(post);
  }

  updatePost(post: Post) {
    this.authService.updateUserPosts(post);
    return this.firestore.collection('posts').doc(post.id).update(post);
  }
  deletePost(post: Post) {
    this.authService.updateUserPosts(post);
    return this.firestore.collection('posts').doc(post.id).delete();
  }
  //get the user's posts
  getUserPosts(id:string) {
    return this.firestore.collection('users').doc(id).valueChanges();
  }
}
