import { MaterialModule } from '@angular-prod-grade/material';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WidgetsDetailsComponent } from './widgets-details.component';

describe('WidgetsDetailsComponent', () => {
  let component: WidgetsDetailsComponent;
  let fixture: ComponentFixture<WidgetsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetsDetailsComponent],
      imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
