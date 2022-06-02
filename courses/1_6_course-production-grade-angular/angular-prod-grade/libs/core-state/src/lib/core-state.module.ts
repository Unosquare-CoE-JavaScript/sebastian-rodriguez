import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWidgets from './widgets/widgets.reducer';
import { WidgetsEffects } from './widgets/widgets.effects';
import { WidgetsFacade } from './widgets/widgets.facade';
import { CoreDataModule } from '@angular-prod-grade/core-data';

export const coreStateRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(
      fromWidgets.WIDGETS_FEATURE_KEY,
      fromWidgets.reducer
    ),
    EffectsModule.forFeature([WidgetsEffects]),
    CoreDataModule,
  ],
  providers: [WidgetsFacade],
})
export class CoreStateModule {}
