import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from "axios"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  getError: boolean = false;
  users: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        this.isLoading = false;
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
        this.isLoading = false;
        this.getError = true;
      })
  }

}
