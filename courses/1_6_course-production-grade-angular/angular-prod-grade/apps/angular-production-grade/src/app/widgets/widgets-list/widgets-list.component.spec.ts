import { MaterialModule } from '@angular-prod-grade/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsListComponent } from './widgets-list.component';

describe('WidgetsListComponent', () => {
  let component: WidgetsListComponent;
  let fixture: ComponentFixture<WidgetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetsListComponent],
      imports: [MaterialModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
