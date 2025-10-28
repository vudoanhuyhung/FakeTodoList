import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('Todo', () => {
  let component: TodoService;
  let fixture: ComponentFixture<TodoService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
