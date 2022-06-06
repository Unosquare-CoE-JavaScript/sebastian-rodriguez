import { Widget } from '@angular-prod-grade/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';

const API_URL = 'http://localhost:3333/api/';

@Injectable({
  providedIn: 'root',
})
export class WidgetsService {
  readonly model = 'widgets';

  constructor(private http: HttpClient) {}

  private get modelURI() {
    return `${API_URL}${this.model}`;
  }

  all = () => {
    console.log('all', this.modelURI);
    return this.http.get<Widget[]>(this.modelURI);
  };

  find = (id: string) => this.http.get<Widget>(this.getUrlWithId(id));

  create = (widget: Widget) => this.http.post<Widget[]>(this.modelURI, widget);

  update = (widget: Widget) => {
    if (!widget.id) {
      return EMPTY;
    }

    return this.http.patch<Widget>(this.getUrlWithId(widget.id), widget);
    // widget.id
    //   ? this.http.put<Widget>(this.getUrlWithId(widget.id), widget)
    //   : of(null);
  };

  delete = (widget: Widget) =>
    widget.id ? this.http.delete<Widget>(this.getUrlWithId(widget.id)) : null;

  private getUrlWithId = (id: string) => `${this.modelURI}/${id}`;
}
