import { Widget } from '@angular-prod-grade/api-interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Get()
  findAll(): Observable<Widget[]> {
    return this.widgetsService.allWidgets;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Widget> {
    return this.widgetsService.findOne(id);
  }
}
