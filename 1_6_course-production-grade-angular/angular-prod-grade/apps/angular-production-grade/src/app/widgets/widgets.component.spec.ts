import { Widget } from '@angular-prod-grade/api-interfaces';
import { CoreStateModule, WidgetsFacade } from '@angular-prod-grade/core-state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// import { MockStore } from '@ngrx/store/testing';

import { WidgetsComponent } from './widgets.component';

const emptyWidget: Widget = { description: '', id: null, title: '' };
const mockWidgetsFacade = {};

describe('WidgetsComponent', () => {
  let component: WidgetsComponent;
  let fixture: ComponentFixture<WidgetsComponent>;
  let widgetFacade: WidgetsFacade;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetsComponent],
      imports: [
        CoreStateModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      // providers: [{ provide: WidgetsFacade, useValue: mockWidgetsFacade }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    widgetFacade = TestBed.inject(WidgetsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select reset form widget', () => {
    const spy = jest.spyOn(widgetFacade, 'selectWidget');
    component.resetForm();
    expect(spy).toHaveBeenCalledWith(emptyWidget);
  });
});
