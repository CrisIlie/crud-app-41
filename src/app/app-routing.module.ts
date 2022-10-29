import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PresentationComponent } from './layouts/presentation/presentation.component';
import { AlbumsComponent } from './views/albums/albums.component';
import { CommentsComponent } from './views/comments/comments.component';
import { IndexComponent } from './views/index/index.component';
import { PhotosComponent } from './views/photos/photos.component';
import { PostsComponent } from './views/posts/posts.component';
import { TodosComponent } from './views/todos/todos.component';
import { UsersComponent } from './views/users/users.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "albums",
        component: AlbumsComponent
      },
      {
        path: "comments",
        component: CommentsComponent
      },
      {
        path: "photos",
        component: PhotosComponent
      },
      {
        path: "posts",
        component: PostsComponent
      },
      {
        path: "todos",
        component: TodosComponent
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: ""
      }
    ]
  },
  {
    path: "",
    component: PresentationComponent, 
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: ""
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
