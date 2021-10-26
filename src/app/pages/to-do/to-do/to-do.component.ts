import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestServiceService } from '../../../services/rest-service.service';
import { UtilityServiceService } from '../../../services/utility-service.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  todoForm: FormGroup;
  todos: Array<any> = [];
  todo: any = {};
  view: string = 'list';
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private restService: RestServiceService,
    private utility: UtilityServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.getOneTodo();
  }

  async fileUpload(event, index) {
    try {
      const file = event.target.files[0];
      
      const fd = new FormData();
      fd.append('', file);
      fd.forEach((value) => {
        console.log(value, "000")
      })
      console.log(event.target, event.target.files[0], event.target.file)
      const response = await this.restService.postFiles(fd);
      if (response.status) {
        this.tasksControls.at(index).get('files').setValue(response.data[0]._id);
      }
    }
    catch (err) {

    }
  }

  async setStatus(event, i) {
    try {
      const status = event.checked ? 'done' : 'undone';
      this.todo.tasks[i].status = status;
      const response = await this.restService.updateTaskStatus({
        todoId: this.todo._id,
        taskIndex: i,
        status
      });

      if (response.status) {
        this.utility.showToast('Todo updated successfully', 'success');
      }
    }
    catch (err) {
      this.utility.showToast('Todo failed to update', 'error');
      const status = event.checked ? 'undone' : 'done';
      this.todo.tasks[i].status = status;
    }
  }

  removeTasks(index) {
    if (this.tasksControls.length == 1) {
      this.tasksControls.at(0).reset();
      return;
    }
    this.tasksControls.removeAt(index);
  }

  removeTaskData(name, index) {
    this.tasksControls.at(index).get(name).reset();
    if (name == 'startTime') {
      this.tasksControls.at(index).get('endTime').reset();
    }
  }

  addTasks() {
    console.log(this.tasksControls);
    this.tasksControls.push(this.taskGroup);
  }

  async initialize() {
    try {
      this.todoForm = this.fb.group({
        name: [''],
        date: [null],
        tasks: this.fb.array(
          [this.taskGroup]
        )
      });

      this.getAllTodo();
    }
    catch (err) {
      this.utility.closeLoader();
      this.utility.showToast(err.error?.message || 'An error occur', 'error');
    }

    
  }

  async submitTodo() {
    try {
      if (!this.todoForm.valid) {
        return this.showError()
      }

      const todo = this.todoForm.value;
      todo.tasks = todo.tasks.map((value) => {
        return {
          ...value,
          startTime: new Date(todo.date || '' + ' ' + value.startTime),
          endTime: new Date(todo.date || '' + ' ' + ' ' + value.endTime)
        }
      });

      const loader = await this.utility.showLoader();
      const response = await this.restService.postTodo(todo);
      loader.close()
      if (response.status) {
        this.todo = response.data;
        this.utility.showToast(response.message || 'Todo was created successfully', 'success');
        this.getAllTodo();
        this.view = 'view'
      }
    }
    catch (err) {
      this.utility.closeLoader();
      this.utility.showToast(err.error?.message || 'An error occur', 'error');
    }
  }

  navigateToTodo(route) {
    this.router.navigateByUrl(route);
  }

  async getOneTodo() {
    try {
      this.activatedRoute.params.subscribe(async (params) => {
        try {
          if (!params.id) {
            return this.view = 'list';
          }
          const loader = await this.utility.showLoader();
          const response = await this.restService.getTodo(params.id);
          loader.close();
          if (response.status) {
            this.todo = response.data;
            this.view = 'view';

          }
        }
        catch (err) {
          this.utility.closeLoader();
          this.utility.showToast(err.error?.message || 'An error occur', 'error');
        }
      })
    }
    catch (err) {

    }
  }

  async getAllTodo() {
    try {
      const loader = await this.utility.showLoader();
      const response = await this.restService.getTodos({});
      loader.close();
      if (response.status) {
        this.todos = response.data?.todos;
        this.todos = this.todos?.map((value, i) => {
          let complete = 0;
          let uncomplete = 0;
          value?.tasks.forEach((_val, j) => {
            _val.status == 'done' ? complete++ : uncomplete++;
          })
          return { ...value, completedTask: complete, uncompletedTask: uncomplete };

        })
        this.view = 'list';
      }
    }
    catch (err) {
      this.utility.closeLoader();
      this.utility.showToast(err.error?.message || 'An error occur', 'error');
    }
  }

  get taskGroup() {
    return this.fb.group({
      task: ['', [Validators.required]],
      startTime: [null],
      endTime: [null],
      description:[''],
      files: [null]
    })
  }

  get tasksControls(): FormArray {
    return this.todoForm.get('tasks') as FormArray;
  }

  showError() {
    this.isSubmitted = true;
    setTimeout(() => {
      this.isSubmitted = false;
    }, 9000);
  }

}
