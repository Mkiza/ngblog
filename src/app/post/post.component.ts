import { Component, Input } from '@angular/core';
import { Post } from '../model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post!: Post;

  ngOnInit(): void {
    console.log(this.post.created_at);
  }
}
