import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Todo } from 'src/app/classes/todo';
import { TodoDataService } from 'src/app/services/todo-data.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  newItemForm: FormGroup;
  item: FormControl;

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {}

  ngOnInit(): void {
    this.item = new FormControl('', [Validators.required, Validators.maxLength(200)]);
    this.newItemForm = new FormGroup({
      item: this.item
    });
  }

  addTodo(formValues) {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    document.getElementById('new-todo').focus();
  }

}
