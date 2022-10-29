import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from "axios";
import { timeInterval, timeout } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit, AfterViewInit {
  // isLoading: boolean = true;
  isLoading: boolean;
  getError: boolean;
  albums: Array<any>;

  updatingAlbums: Array<any>;
  updateAlbumErrors: Array<any>;

  isCreatingANewAlbum: boolean;
  createNewAlbumError: boolean;
  incorrectForm: boolean;

  // In angular ordinea de chemare la initializare este:
  // constructor -> ngOnInit -> ngAfterViewInit
  // indiferent de ordinea lor in care sunt scrise

  // inainte de componenta sa fie pusa in browser
  constructor() {
    this.isLoading = true;
    this.getError = false;
    // this.albums = new Array();
    this.albums = [];

    this.updatingAlbums = [];
    this.updateAlbumErrors = [];

    this.isCreatingANewAlbum = false;
    this.createNewAlbumError = false;
    this.incorrectForm = false;

    console.log("constructor");
  }

  // dupe ce de componenta a fost pusa in browser
  ngAfterViewInit(): void {

    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(response => {
        console.log(response);
        this.isLoading = false;
        this.albums = response.data;
      })
      .catch(error => {
        console.error(error);
        this.isLoading = false;
        this.getError = true;
      });

    console.log("ngAfterViewInit");

    setTimeout(() => {
      console.log("5000: after axios.get.then")
    }, 5000); // 5000 = 5000 milliseconds = 5 seconds

    setTimeout(() => {
      console.log("3000: after axios.get.then")
    }, 3000); // 5000 = 5000 milliseconds = 5 seconds

  }

  // in timp ce componenta este pusa in browser
  ngOnInit(): void {
    console.log("ngOnInit");
  }

  updateAlbum(albumId: number): void {
    if(!this.updatingAlbums.includes(albumId) && !this.updateAlbumErrors.includes(albumId)){
      this.updatingAlbums.push(albumId);
      // console.log((<HTMLInputElement>document.querySelector(`#formControlInputTitle-${albumId}`)).value);
      // console.log((<HTMLInputElement>document.querySelector(`#formControlInputTitle-${albumId}`)));
      axios
        .put(`https://jsonplaceholder.typicode.com/albums/${albumId}`,
          {
            body: JSON.stringify({
              title: (<HTMLInputElement>document.querySelector(`#formControlInputTitle-${albumId}`)).value,
              userId: (<HTMLInputElement>document.querySelector(`#formControlInputUserId-${albumId}`)).value,
            }),
          },
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }
        )
        .then(response => {
          this.updatingAlbums = this.updatingAlbums.filter(item => item !== albumId);
          this.albums = this.albums.map(album => {
            if(album.id === albumId){
              return {
                ...album,
                title: (<HTMLInputElement>document.querySelector(`#formControlInputTitle-${albumId}`)).value,
                userId: (<HTMLInputElement>document.querySelector(`#formControlInputUserId-${albumId}`)).value,
              }
            } else {
              return album;
            }
          })
        })
        .catch(error => {
          this.updatingAlbums = this.updatingAlbums.filter(item => item !== albumId);
          this.updateAlbumErrors.push(albumId);
          this.albums = this.albums.map(album => {
            if(album.id === albumId){
              return {...album}
            } else {
              return album;
            }
          })
          setTimeout(() => {
            this.updateAlbumErrors = this.updateAlbumErrors.filter(item => item !== albumId);
          }, 4000);
        })
    }
  }

  createNewAlbum(userId: number, albumTitle: string): void {
    console.log(userId);
    console.log(albumTitle);
    // aici verificam ca userId sa fie un numar intreg mai mare ca 0
    // si titlul unui album sa aiba minim 8 caractere
    if (!isNaN(userId) && userId > 0 && albumTitle.length >= 8) {
      this.isCreatingANewAlbum = true;
      axios
        .post("https://jsonplaceholder.typicode.com/albums",
        {
          userId: userId,
          title: albumTitle
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => {
          console.log(response);
          this.isCreatingANewAlbum = false;
          this.createNewAlbumError = false;
          this.albums = [response.data, ...this.albums];
          (<HTMLInputElement>document.querySelector("#formControlInputTitle-new")).value = "";
          (<HTMLInputElement>document.querySelector("#formControlInputUserId-new")).value = "";
        })
        .catch(error => {
          console.error(error);
          this.isCreatingANewAlbum = false;
          this.createNewAlbumError = true;
        })
    } else {
      this.incorrectForm = true;
      setTimeout(() => {
        this.incorrectForm = false;
      }, 5000);
    }
  }

  classParseInt(fromString: string): number {
    // parseInt este o functie de JavaScript care
    // transforma un numar de tip string, intr-un
    // numar de tip number (integer)
    // Ex: "43" -> parseInt("43") = 43
    // Ex: "106.78" -> parseInt("106.78") = 106
    // Ex: "" -> parseInt("") = NaN
    // parseFloat - la fel ca la parseInt, dar number (float)
    // Ex: "106.78" -> parseFloat("106.78") = 106.78
    // Ex: "" -> parseFloat("") = NaN
    // NaN = Not A Number
    return parseInt(fromString);
  }

}



/*

  const X = { [key]: [valoare] };
  key - este un cuvant (mai multe cuvinte legate prin ".", "_", "-" sau daca nu, legate prin camelCase)
  valoare - poate sa fie orice, poate sa fie chiar si un alt obiect

  const X = {
    name: "Nazare",
    job: "Front End Developer",
    otherDetails: {
      hobbies: ["Formula 1", "Hiking", "Drinking"],
      favouriteColor: "Green",
      isRomanian: true,
      noOfArms: 2,
      something: [1, 2, 3, 4],
      somethingElse: ["Hello", 1, false, {smth: "Smth"}]
    }
  }

*/

