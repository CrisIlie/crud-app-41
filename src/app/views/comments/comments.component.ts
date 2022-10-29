import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  comments: Array<any>;
  isLoading: boolean;
  getError: boolean;

  constructor() {
    this.comments = [];
    this.isLoading = true;
    this.getError = false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(response => {
        this.comments = response.data;
        this.isLoading = false;
      })
      .catch(error => {
        console.error(error);
        this.getError = true;
      })
  }

}
