import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as WidgetsActions from './widgets.actions';
import { WidgetsEffects } from './widgets.effects';
import { WidgetsFacade } from './widgets.facade';
import { WidgetsEntity } from './widgets.models';
import {
  WIDGETS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './widgets.reducer';
import * as WidgetsSelectors from './widgets.selectors';

interface TestSchema {
  widgets: State;
}

describe('WidgetsFacade', () => {
  let facade: WidgetsFacade;
  let store: Store<TestSchema>;
  const createWidgetsEntity = (id: string, name = ''): WidgetsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(WIDGETS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([WidgetsEffects]),
        ],
        providers: [WidgetsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(WidgetsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allWidgets$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allWidgets$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadWidgetsSuccess` to manually update list
     */
    it('allWidgets$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allWidgets$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        WidgetsActions.loadWidgetsSuccess({
          widgets: [createWidgetsEntity('AAA'), createWidgetsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allWidgets$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
