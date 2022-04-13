import { Widget } from '@angular-prod-grade/api-interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'angular-prod-grade-widgets-details',
  templateUrl: './widgets-details.component.html',
  styleUrls: ['./widgets-details.component.scss'],
})
export class WidgetsDetailsComponent {
  currentWidget!: Widget;
  originalTitle!: string;
  @Input() set widget(value: Widget) {
    if (value) this.originalTitle = value.title;
    this.currentWidget = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
