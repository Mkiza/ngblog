import { Component } from '@angular/core';
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  newPost: Post;
    constructor( private postService: PostService, private router: Router, private authService: AuthService) { 
      this.newPost = {
        id:'0',
        title: "",
        content: "",
        created_at: new Date(),
        loveIts: 0,
        hateIts: 0,
        created_by: '',
      }
    }
  

    createPost() {
      if(this.newPost.title){
        console.log(this.newPost);
        this.postService.createPost(this.newPost).then(result => {
          alert("Post created successfully");
          this.router.navigate(['dashboard']);
          
        }).catch(err => {
          alert("Error creating post");
        });
    }}
}
