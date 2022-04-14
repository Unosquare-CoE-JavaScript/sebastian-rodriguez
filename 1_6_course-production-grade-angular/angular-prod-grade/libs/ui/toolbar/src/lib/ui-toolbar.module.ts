import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiToolbarComponent } from './ui-toolbar.component';
import { MaterialModule } from '@angular-prod-grade/material';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [UiToolbarComponent],
  exports: [UiToolbarComponent],
})
export class UiToolbarModule {}
