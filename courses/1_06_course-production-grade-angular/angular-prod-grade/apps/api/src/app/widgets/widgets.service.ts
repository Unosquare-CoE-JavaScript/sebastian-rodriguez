import { Widget } from '@angular-prod-grade/api-interfaces';
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

let widgets: Widget[] = [
  {
    id: '1',
    title: 'Widget 1',
    description: 'This is a widget',
  },
  {
    id: '2',
    title: 'Widget 2',
    description: 'This is a widget',
  },
  {
    id: '3',
    title: 'Widget 3',
    description: 'This is a widget',
  },
];

@Injectable()
export class WidgetsService {
  create(widget: Widget): Observable<Widget[]> {
    widgets = [...widgets, { ...widget, id: uuidv4() }];
    return of(widgets);
  }

  findAll(): Observable<Widget[]> {
    return of(widgets);
  }

  findOne(id: string): Observable<Widget[]> {
    return of(widgets.filter((widget) => widget.id === id));
  }

  update(id: string, widget: Widget): Observable<Widget[]> {
    widgets = widgets.map((w) => (w.id === id ? widget : w));
    return of(widgets);
  }

  remove(id: string) {
    widgets = widgets.filter((widget) => widget.id !== id);
    return of(widgets);
  }
}
