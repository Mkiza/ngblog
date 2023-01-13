import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../model/post';
import { AuthService } from '../../service/auth.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent {
  post!: Post;
  private routeSub: Subscription | undefined;
  constructor(private route: ActivatedRoute, private postService: PostService, public authService: AuthService,private router: Router) { }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.getSpecificPost(params['id']) //log the value of id
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  getSpecificPost(id: string) {
    this.postService.getPost(id).subscribe((x: any) => {
      this.post = x;
      console.log(x)
    })
  }
  editPost(post:Post) {
    if(this.post){
      this.postService.updatePost(this.post).then(result => {
        alert("Post updated successfully");
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
      }).catch(err => {
        alert("Error updating post");
      });
    }
  }
}
