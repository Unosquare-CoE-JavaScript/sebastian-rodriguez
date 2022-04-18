import { Widget } from '@angular-prod-grade/api-interfaces';
import { WidgetsService } from '@angular-prod-grade/core-data';
import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import * as WidgetsActions from './widgets.actions';
import * as WidgetsFeature from './widgets.reducer';
import * as WidgetsSelectors from './widgets.selectors';

@Injectable()
export class WidgetsFacade {
  private allWidgets = new Subject<Widget[]>();
  private selectedWidget = new Subject<Widget>();
  private mutations = new Subject();

  allWidgets$: Observable<Widget[]> = this.allWidgets.asObservable();
  selectedWidget$: Observable<Widget> = this.selectedWidget.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(private widgetService: WidgetsService) {}

  selectWidget = (widget: Widget) => this.selectedWidget.next(widget);

  loadWidgets = () =>
    this.widgetService
      .all()
      .subscribe((widgets) => this.allWidgets.next(widgets));

  // /**
  //  * Combine pieces of state using createSelector,
  //  * and expose them as observables through the facade.
  //  */
  // loaded$ = this.store.pipe(select(WidgetsSelectors.getWidgetsLoaded));
  // allWidgets$ = this.store.pipe(select(WidgetsSelectors.getAllWidgets));
  // selectedWidget$ = this.store.pipe(select(WidgetsSelectors.getSelected));

  // constructor(private readonly store: Store) {}

  // /**
  //  * Use the initialization action to perform one
  //  * or more tasks in your Effects.
  //  */
  // init() {
  //   this.store.dispatch(WidgetsActions.init());
  // }

  // dispatch(action: Action) {
  //   this.store.dispatch(action);
  // }
}
