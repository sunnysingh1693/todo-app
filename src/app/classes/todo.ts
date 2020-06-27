export class Todo {
  id: number;
  title: string;
  timeStamp: string;
  completed: boolean = false;
  edit: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
