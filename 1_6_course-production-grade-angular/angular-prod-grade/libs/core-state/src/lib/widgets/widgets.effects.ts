import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WidgetsActions from './widgets.actions';
import * as WidgetsFeature from './widgets.reducer';

@Injectable()
export class WidgetsEffects {
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

  constructor(private readonly actions$: Actions) {}
}
