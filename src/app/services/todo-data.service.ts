import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId: number = 0;
  todos: Todo[] = [];

  constructor(private storageService: StorageService) {
    this.todos = storageService.getData('todoListStorageKey') || [];
  }

  addTodo(todo: Todo) {
    let currentDate = new Date();
    if(!todo.id) {
      todo.id = ++this.lastId;
      todo.timeStamp = currentDate.toLocaleDateString() + ' | ' + currentDate.toLocaleTimeString();
    }
    this.todos.push(todo);
    this.storageService.setData('todoListStorageKey', this.todos);
    return this;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(
      todo => todo.id !== id
    );
    this.saveList();
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
    this.saveList();
  }

  private saveList() {
    this.storageService.setData('todoListStorageKey', this.todos);
  }

  todoIsComplete(todo: Todo) {
    let updateTodo = this.updateTodo(todo.id, {
      completed: !todo.completed
    });
    return updateTodo;
  }

}
