import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PostService } from '../service/post.service';
import { Post } from '../model/post';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {
  canDelete:boolean = false;
  post: Post | undefined;
  private routeSub: Subscription | undefined;
  constructor(private route: ActivatedRoute, private postService: PostService, public authService: AuthService) { }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.getSpecificPost(params['id']) //log the value of id
    });
  }

  beDeleted():boolean {
    if(this.post && this.post?.hateIts > 5 ) {
      return true;
    }
    return false;
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

  deletePost(id: string) {
    this.postService.deletePost(id).then(result => {
      alert("Post deleted successfully");
    }).catch(err => {
      alert("Error deleting post");
    });
  }

  likePost(id: string) {
    if(this.post){
      this.post.loveIts++;
      if(this.post.hateIts > 0)
      this.post.hateIts--;
      this.postService.updatePost(id,this.post).then(result => {
        
      }).catch(err => {
        alert("Error updating post");
      });
    }
    
   
  }

  dislikePost(id: string) {
    if(this.post){
      if(this.post.loveIts > 0)
      this.post.loveIts--;
      this.post.hateIts++;
      this.postService.updatePost(id,this.post).then(result => {
      }).catch(err => {
        alert("Error updating post");
      });
    }
   
  }
}
