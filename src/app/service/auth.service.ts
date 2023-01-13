import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Post } from '../model/post';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  userData: any; // Save logged in user data

  constructor(private auth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
     /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
   }

  
  // login method
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
    .then((result) => { 
      if(result.user?.emailVerified !== true) {
        this.SendVerificationMail();
          window.alert(
            'Please validate your email address. Kindly check your inbox.'
          );
      } else {
      this.SetUserData(result.user);
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        }
      });}}, 
    error => {alert(
      error.message
    ), this.router.navigate(['/login'])});
  }
  
/* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      posts: [],
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
// Send email verification when new user sign up
SendVerificationMail() {
  return this.auth.currentUser
    .then((user) => {
      return user?.sendEmailVerification();
    })
    .then(() => {
      this.router.navigate(['verify-email']);
    });
}

  // register method
  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {this.SendVerificationMail(), this.router.navigate(['/verify-email'])}, 
    error => {alert(error.message), this.router.navigate(['/register'])});
  }

  // logout method
  logout() {
    return this.auth.signOut().then(() => {localStorage.removeItem('user'), this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });}, error => {alert('Error!')});
  }
  
  // update user post 
  updateUserPosts(post: Post) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.userData.uid}`
    );
   return updateDoc(userRef.ref, {
      posts: arrayRemove(post)
    });

  }

 
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;;
  }

}
