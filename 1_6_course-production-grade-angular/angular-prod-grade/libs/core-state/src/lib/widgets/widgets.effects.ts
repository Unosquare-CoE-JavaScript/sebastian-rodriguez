import { WidgetsService } from '@angular-prod-grade/core-data';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import * as WidgetsActions from './widgets.actions';
import * as WidgetsFeature from './widgets.reducer';

@Injectable()
export class WidgetsEffects {
  // loadWidgets$ = createEffect(() => this.actions$.pipe(
  //   ofType(WidgetsActions.loadWidgets),
  //   fetch({
  //     run: action => {
  //       this.widgetService
  //         .all()
  //         .pipe(
  //           map(widgets => WidgetsActions.loadWidgetsSuccess({ widgets }))
  //         ),
  //         onError: (action, error) => WidgetsActions.loadWidgetsFailure({ error })
  //     })
  // ));

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return WidgetsActions.loadWidgetsSuccess({ widgets: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WidgetsActions.loadWidgetsFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly widgetService: WidgetsService
  ) {}
}
