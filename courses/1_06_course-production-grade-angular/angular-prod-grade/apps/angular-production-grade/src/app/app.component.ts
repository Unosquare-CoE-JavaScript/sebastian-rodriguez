import { Component } from '@angular/core';

@Component({
  selector: 'angular-prod-grade-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  links = [
    { path: '/', icon: 'home', title: 'home' },
    { path: '/widgets', icon: 'view_list', title: 'widgets' },
  ];

  logout() {
    return;
  }
}
