import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  getError: boolean = false;
  photos: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        this.photos = response.data;
        this.isLoading = false;
      })
      .catch(error => {
        console.error(error);
        this.getError = true;
        this.isLoading = false;
      })
  }

}
