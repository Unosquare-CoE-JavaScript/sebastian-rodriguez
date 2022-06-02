import { Widget } from '@angular-prod-grade/api-interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'angular-prod-grade-widgets-details',
  templateUrl: './widgets-details.component.html',
  styleUrls: ['./widgets-details.component.scss'],
})
export class WidgetsDetailsComponent {
  currentWidget: Partial<Widget> = {
    description: '',
    title: '',
  };
  @Input() widget: Widget | null = this.currentWidget as Widget;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  get originalTitle() {
    return this.widget?.title || '';
  }

  logWidget() {
    console.log(this.currentWidget);
  }
}
