import { Component } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  data: Post[] = [];
  sorted: Post[] = [];
  private routeSub: Subscription | undefined;
  featuredPost: any
  isFetching: boolean = false
  constructor(private ps: PostService, private route: ActivatedRoute, 
   ) { }

  ngOnInit(): void {
    
    this.getAllPost();
    this.routeSub = this.route.params.subscribe(params => {
      //this.getUserPosts(params['id']) //log the value of id
    });
  }

  getAllPost() {
    this.isFetching = true;
    this.ps.getPosts().subscribe((x: any) => {
      x.forEach((element: any) => {
        this.data.push(element)
      });
      this.sortDesecending(this.data);

    })
  }
  getUserPosts(id: string) {
    this.isFetching = true;
    this.ps.getUserPosts(id).subscribe((x: any) => {
      x.forEach((element: any) => {
        this.data.push(element)
      });
      this.sortDesecending(this.data);

    })
  }

  sortDesecending(data: Post[]) {
    this.sorted = data.sort((a: any, b: any) =>
      <any>new Date(b.created_date) - <any>new Date(a.created_date)
    )
  }
  
}
