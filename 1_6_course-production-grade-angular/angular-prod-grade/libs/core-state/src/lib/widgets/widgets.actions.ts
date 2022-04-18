import { createAction, props } from '@ngrx/store';
import { WidgetsEntity } from './widgets.models';

export const init = createAction('[Widgets Page] Init');

export const loadWidgetsSuccess = createAction(
  '[Widgets/API] Load Widgets Success',
  props<{ widgets: WidgetsEntity[] }>()
);

export const loadWidgetsFailure = createAction(
  '[Widgets/API] Load Widgets Failure',
  props<{ error: any }>()
);
