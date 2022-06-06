import { Widget } from '@angular-prod-grade/api-interfaces';

export class CreateWidgetDto implements Partial<Widget> {
  readonly title: string;
  readonly description: string;
}
