import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Todo } from 'src/app/classes/todo';
import { TodoDataService } from 'src/app/services/todo-data.service';
import { SpaceValidator } from "./space.validator";

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
    // this.item = new FormControl('', [Validators.required, Validators.maxLength(200), SpaceValidator.spacesAtFront]);

    this.newItemForm = new FormGroup({
      item: this.item
    });
  }

  addTodo(formValues) {
    if(this.item.value.trim().length === 0) {
      alert('Can not submit whitespaces.\nTry again!!');
      this.item.setValue('');
      return false;
    }
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    document.getElementById('new-todo').focus();
  }

}
