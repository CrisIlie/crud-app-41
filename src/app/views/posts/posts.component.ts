import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit {
  isLoading: boolean;
  getError: boolean;
  posts: Array<any>;

  constructor() {
    this.posts = [];
    this.isLoading = true;
    this.getError = false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        this.posts = response.data;
        this.isLoading = false;
      })
      .catch(error => {
        console.error(error);
        this.getError= true;
        this.isLoading = false;
      });
  }  

}
