import { Widget } from '@angular-prod-grade/api-interfaces';
import { WidgetsService } from '@angular-prod-grade/core-data';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const emptyWidget: Widget = {
  id: null,
  title: '',
  description: '',
};

@Component({
  selector: 'angular-prod-grade-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]>;
  selectedWidget!: Widget;

  constructor(private readonly widgetService: WidgetsService) {
    this.widgets$ = this.allWidgets;
  }

  ngOnInit(): void {
    this.reset();
  }

  get allWidgets() {
    return this.widgetService.all();
  }

  reset() {
    this.loadWidgets();
    this.selectWidget(emptyWidget);
  }

  resetForm() {
    this.selectedWidget = emptyWidget;
  }

  selectWidget(widget: Widget) {
    this.selectedWidget = widget;
  }

  loadWidgets() {
    this.widgets$ = this.allWidgets;
  }

  saveWidget(widget: Widget) {
    console.log(widget);

    if (widget.id) {
      this.updateWidget(widget);
    } else {
      this.createWidget(widget);
    }
  }

  createWidget(widget: Widget) {
    // const newWidget = Object.assign({}, widget, { id: this.getRandomID() });
    // this.widgets = [...this.widgets, newWidget];
    this.widgets$ = this.widgetService.create(widget);
    this.resetForm();
  }

  updateWidget(widget: Widget) {
    // this.widgets = this.widgets.map((w) => {
    //   return widget.id === w.id ? widget : w;
    // });
    console.log(widget);

    this.widgetService.update(widget).subscribe();
    this.reset();
  }

  deleteWidget(widget: Widget) {
    // this.widgets = this.widgets.filter((w) => widget.id !== w.id);
    this.widgetService.delete(widget)?.subscribe();
    this.reset();
  }

  private getRandomID() {
    return Math.random().toString(36).substring(7);
  }
}
