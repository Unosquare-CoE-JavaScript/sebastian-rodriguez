import { Widget } from '@angular-prod-grade/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  create = (widget: Widget) => this.http.post(this.modelURI, widget);

  update = (widget: Widget) =>
    widget.id
      ? this.http.put(this.getUrlWithId(widget.id), widget)
      : this.create(widget);

  delete = (widget: Widget) =>
    widget.id ? this.http.delete(this.getUrlWithId(widget.id)) : null;

  private getUrlWithId = (id: string) => `${this.modelURI}/${id}`;
}
