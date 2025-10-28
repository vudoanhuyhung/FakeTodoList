import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoFilter } from '../components/todo-filter/todo-filter.component';
import { CommonModule } from '@angular/common';

// Child Components
import { TodoFormComponent } from '../components/todo-form/todo-form.component';
import { TodoFilterComponent } from '../components/todo-filter/todo-filter.component';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';

// Angular Material Modules
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoFormComponent,
    TodoFilterComponent,
    TodoItemComponent,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIcon
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  // Observable stream of filtered todos
  filteredTodos$!: Observable<Todo[]>;

  // Subject to hold the current filter state
  private filterSubject = new BehaviorSubject<TodoFilter>('all');

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    // Get the base stream of all todos
    const allTodos$ = this.todoService.getTodos();

    // Get the stream of filter changes
    const filter$ = this.filterSubject.asObservable();

    // Combine todos and filter to get the final displayed list
    this.filteredTodos$ = combineLatest([allTodos$, filter$]).pipe(
      map(([todos, filter]) => {
        return this.filterTodos(todos, filter);
      })
    );
  }

  /** Applies the current filter to the todo list */
  private filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  }

  // --- Event Handlers ---

  onTodoAdded(text: string): void {
    this.todoService.addTodo(text).subscribe();
  }

  onFilterChanged(filter: TodoFilter): void {
    this.filterSubject.next(filter);
  }

  onTodoToggled(todo: Todo): void {
    this.todoService.toggleTodoCompletion(todo).subscribe();
  }

  onTodoRemoved(id: number): void {
    this.todoService.removeTodo(id).subscribe();
  }

  onTodoEdited(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }
}
