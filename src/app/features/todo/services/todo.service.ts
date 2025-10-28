import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly SIMULATED_DELAY = 300; // Configurable delay

  // Initial placeholder data
  private initialTodos: Todo[] = [
    { id: 1, text: 'Learn Angular basics', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Deploy the app', completed: false },
  ];

  private todosSubject = new BehaviorSubject<Todo[]>(this.initialTodos);
  public todos$ = this.todosSubject.asObservable();

  constructor() { }

  /** Gets all todos */
  getTodos(): Observable<Todo[]> {
    return this.todos$.pipe(delay(this.SIMULATED_DELAY));
  }

  /** Adds a new todo */
  addTodo(text: string): Observable<Todo> {
    const newTodo: Todo = {
      id: Date.now(), // simple unique ID
      text: text,
      completed: false
    };

    const currentTodos = this.todosSubject.getValue();
    this.todosSubject.next([...currentTodos, newTodo]);

    return of(newTodo).pipe(delay(this.SIMULATED_DELAY));
  }

  /** Removes a todo by its ID */
  removeTodo(id: number): Observable<boolean> {
    const currentTodos = this.todosSubject.getValue();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.todosSubject.next(updatedTodos);

    return of(true).pipe(delay(this.SIMULATED_DELAY));
  }

  /** Updates an existing todo */
  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const currentTodos = this.todosSubject.getValue();
    const updatedTodos = currentTodos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.todosSubject.next(updatedTodos);

    return of(updatedTodo).pipe(delay(this.SIMULATED_DELAY));
  }

  /** Toggles the 'completed' state of a todo */
  toggleTodoCompletion(todo: Todo): Observable<Todo> {
    const updatedTodo = { ...todo, completed: !todo.completed };
    return this.updateTodo(updatedTodo);
  }
}
