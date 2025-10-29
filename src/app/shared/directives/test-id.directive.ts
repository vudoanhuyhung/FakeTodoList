import { Directive, Input, OnChanges, Renderer2, SimpleChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[testId]',
  standalone: true
})
export class TestIdDirective implements OnChanges {
  @Input('testId') testId?: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(_changes: SimpleChanges) {
    if (this.testId != null && this.testId !== '') {
      this.renderer.setAttribute(this.el.nativeElement, 'data-testid', this.testId);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'data-testid');
    }
  }
}
