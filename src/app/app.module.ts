import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PresentationComponent } from './layouts/presentation/presentation.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PostsComponent } from './views/posts/posts.component';
import { CommentsComponent } from './views/comments/comments.component';
import { AlbumsComponent } from './views/albums/albums.component';
import { PhotosComponent } from './views/photos/photos.component';
import { TodosComponent } from './views/todos/todos.component';
import { UsersComponent } from './views/users/users.component';
import { IndexComponent } from './views/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    PresentationComponent,
    DashboardComponent,
    PostsComponent,
    CommentsComponent,
    AlbumsComponent,
    PhotosComponent,
    TodosComponent,
    UsersComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
