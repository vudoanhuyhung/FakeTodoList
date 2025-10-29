import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { TestIdDirective } from '../../../../shared/directives/test-id.directive';

// Angular Material Modules
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    TestIdDirective
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() toggled = new EventEmitter<Todo>();
  @Output() removed = new EventEmitter<number>();
  @Output() edited = new EventEmitter<Todo>();

  isEditing = false;
  editText = '';

  startEdit(): void {
    this.isEditing = true;
    this.editText = this.todo.text;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveEdit(): void {
    if (this.editText.trim() && this.editText !== this.todo.text) {
      this.edited.emit({ ...this.todo, text: this.editText.trim() });
    }
    this.isEditing = false;
  }
}
