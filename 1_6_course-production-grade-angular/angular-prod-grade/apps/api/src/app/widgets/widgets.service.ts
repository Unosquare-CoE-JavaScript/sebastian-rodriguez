import { Widget } from '@angular-prod-grade/api-interfaces';
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class WidgetsService {
  readonly widgets: Widget[] = [
    { id: '1', title: 'Widget 03', description: 'Pending' },
    { id: '2', title: 'Widget 02', description: 'Pending' },
    { id: '3', title: 'Widget 01', description: 'Pending' },
  ];

  get allWidgets(): Observable<Widget[]> {
    return of(this.widgets);
  }

  findOne = (id: string): Observable<Widget> =>
    of(this.widgets.find((widget) => widget.id === id));
}
