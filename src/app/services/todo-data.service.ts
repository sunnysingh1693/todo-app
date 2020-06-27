import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId: number = 0;
  todos: Todo[] = [];

  constructor() { }

  addTodo(todo: Todo) {
    let currentDate = new Date();
    if(!todo.id) {
      todo.id = ++this.lastId;
      todo.timeStamp = currentDate.toLocaleDateString() + ' | ' + currentDate.toLocaleTimeString();
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(
      todo => todo.id !== id
    );
    return this;
  }

  fetchAllTodos(): Todo[] {
    return this.todos;
  }

  fetchOneTodo(id: number): Todo {
    return this.todos
      .filter(
        todo => todo.id === id
      ).pop();
  }

  updateTodo(id: number, values: Object = {}): Todo {
    let todo = this.fetchOneTodo(id);
    if(!todo) {
      return null;
    }
    Object.assign(todo, values);
  }

  todoIsComplete(todo: Todo) {
    let updateTodo = this.updateTodo(todo.id, {
      completed: !todo.completed
    });
    this.addToComplted(todo);
    return updateTodo;
  }

  //***** Complted array functions *****//
  completedTodos: Todo[] = [];

  addToComplted(completedTodo: Todo) {
    let completedTodoItem = this.fetchOneTodo(completedTodo.id)
    this.completedTodos.push(completedTodoItem);
    this.deleteTodo(completedTodo.id)
  }

  deleteCompletedTodo(id: number) {
    this.completedTodos = this.completedTodos.filter(
      todo => todo.id !== id
    );
    return this;
  }

  fetchAllCompletedTodos(): Todo[] {
    return this.completedTodos;
  }

  fetchOneCompletedTodo(id: number): Todo {
    return this.completedTodos
      .filter(
        todo => todo.id === id
      ).pop();
  }
}
