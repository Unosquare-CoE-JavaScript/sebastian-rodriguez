import { Widget } from '@angular-prod-grade/api-interfaces';
import { WidgetsService } from '@angular-prod-grade/core-data';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'angular-prod-grade-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  widgets$: Observable<Widget[]>;

  constructor(private readonly widgetService: WidgetsService) {
    this.widgets$ = this.widgetService.all();
  }

  links = [
    { path: '/', icon: 'home', title: 'home' },
    { path: '/widgets', icon: 'view_list', title: 'widgets' },
  ];
}
