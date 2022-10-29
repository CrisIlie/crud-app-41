import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from "axios";
import { timeout } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  getError: boolean = false;
  todos: Array<any> = [];
  
  deletingTodos: Array<any> = [];
  deleteTodoErrors: Array<any> = [];

  patchingTodos: Array<any> = [];
  patchTodoErrors: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        this.isLoading = false;
        this.todos = response.data;
      })
      .catch(error => {
        console.error(error);
        this.isLoading = false;
        this.getError = true;
      })
  }

  deleteTodo(todoId: number): void {
    if(!this.deletingTodos.includes(todoId) && !this.deleteTodoErrors.includes(todoId)) {
      this.deletingTodos.push(todoId);
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        .then(response => {
          this.deletingTodos = this.deletingTodos.filter(item => item !== todoId);
          this.todos = this.todos.filter(todo => todo.id !== todoId);
        })
        .catch(error => {
          console.error(error);
          this.deleteTodoErrors.push(todoId);
          this.deletingTodos = this.deletingTodos.filter(item => item !== todoId);
          setTimeout(() => {
            this.deleteTodoErrors = this.deleteTodoErrors.filter(item => item !== todoId);
          }, 4000);
        })
    }
  }

  patchTodo(event: any, todoId: number): void {
    if (!this.patchingTodos.includes(todoId) && !this.patchTodoErrors.includes(todoId)) {
      this.patchingTodos.push(todoId);
      // console.log(event);
      // console.log(event.target.checked);
      
      axios
        .patch(`https://jsonplaceholder.typicode.com/todasdsos/${todoId}`, 
          {
            body: JSON.stringify({
              completed: event.target.checked
            })
          },
          {
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
          }
        )
        .then(response => {
          this.patchingTodos = this.patchingTodos.filter(item => item !== todoId);
          this.todos = this.todos.map(item => {
            if(item.id === todoId) {
              return {
                ...item,
                completed: event.target.checked
              }
            } else {
              return item;
            }
          })
        })
        .catch(error => {
          console.error(error);
          this.patchTodoErrors.push(todoId);
          this.patchingTodos = this.patchingTodos.filter(item => item !== todoId);
          this.todos = this.todos.map(item => {
            if(item.id === todoId) {
              return {
                ...item
              }
            } else {
              return item;
            }
          });
          setTimeout(() => {
            this.patchTodoErrors = this.patchTodoErrors.filter(item => item !== todoId);
          }, 4000);
        })
    }
  }

}
