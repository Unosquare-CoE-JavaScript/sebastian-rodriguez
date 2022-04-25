import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'angular-prod-grade-ui-toolbar',
  templateUrl: './ui-toolbar.component.html',
  styleUrls: ['./ui-toolbar.component.scss'],
})
export class UiToolbarComponent {
  @Output() toogleSideNav = new EventEmitter();
  @Output() logout = new EventEmitter();
}
