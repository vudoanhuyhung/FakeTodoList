import { Component, EventEmitter, Output } from '@angular/core';
import { TestIdDirective } from '../../../../shared/directives/test-id.directive';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';

export type TodoFilter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    TestIdDirective
  ],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss'
})
export class TodoFilterComponent {
  @Output() filterChanged = new EventEmitter<TodoFilter>();

  onFilterChange(event: MatButtonToggleChange): void {
    this.filterChanged.emit(event.value as TodoFilter);
  }
}
