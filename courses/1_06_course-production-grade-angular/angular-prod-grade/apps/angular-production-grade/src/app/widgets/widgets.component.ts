import { Widget } from '@angular-prod-grade/api-interfaces';
import { WidgetsService } from '@angular-prod-grade/core-data';
import { WidgetsFacade } from '@angular-prod-grade/core-state';
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
  selectedWidget$: Observable<Widget>;

  constructor(private readonly widgetFacade: WidgetsFacade) {
    this.widgets$ = this.widgetFacade.allWidgets$;
    this.selectedWidget$ = this.widgetFacade.selectedWidget$;
  }

  ngOnInit(): void {
    this.reset();
  }

  get allWidgets() {
    return this.widgetFacade.loadWidgets();
  }

  reset() {
    this.loadWidgets();
    this.selectWidget(emptyWidget);
  }

  resetForm() {
    this.widgetFacade.selectWidget(emptyWidget);
  }

  selectWidget(widget: Widget) {
    this.widgetFacade.selectWidget(widget);
  }

  loadWidgets() {
    this.widgetFacade.loadWidgets();
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
    // Other possible way
    // this.widgets$ = this.widgetService.create(widget);
    // This make a second http request with the new data
    // this.widgetService.create(widget).subscribe((_) => this.reset());
  }

  updateWidget(widget: Widget) {
    // this.widgetService.update(widget).subscribe((_) => this.reset());
  }

  deleteWidget(widget: Widget) {
    // this.widgetService.delete(widget)?.subscribe((_) => this.reset());
  }

  private getRandomID() {
    return Math.random().toString(36).substring(7);
  }
}
