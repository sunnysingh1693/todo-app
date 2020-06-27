import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Todo } from 'src/app/classes/todo';
import { TodoDataService } from 'src/app/services/todo-data.service';
import { faTimesCircle, faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {

  @Input () newTodo: Todo = new Todo();
  newItemForm: FormGroup;
  title: FormControl;
  @ViewChild('closebutton') closebutton;

  constructor(private todoDataService: TodoDataService) {}

  ngOnInit(): void {
    this.title = new FormControl('', [Validators.required, Validators.maxLength(200)]);
    this.newItemForm = new FormGroup({
      title: this.title
    });
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodo(todo.id);
  }

  get todos() {
    return this.todoDataService.fetchAllTodos();
  }

  get completedTodos() {
    return this.todoDataService.fetchAllCompletedTodos();
  }

  removeCompletedTodo(completedtodo) {
    this.todoDataService.deleteCompletedTodo(completedtodo.id);
  }

  toggleTodoComplete(todo) {
    this.todoDataService.todoIsComplete(todo);
    console.log(todo.completed)
  }

  titleForUpdate(todo) {
    Object.assign(this.newTodo, todo);
  }


  updateTodo(id: number, formValues: string) {
    this.todoDataService.updateTodo(id, formValues);
    this.newTodo = new Todo();
    this.closebutton.nativeElement.click();
  }

  // These are fortawesome icon variables
  faTimesCircle = faTimesCircle;
  faCheckCircle = faCheckCircle;
  faEdit = faEdit;
}
