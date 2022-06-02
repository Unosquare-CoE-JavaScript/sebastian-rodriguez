import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WidgetsService } from './widgets.service';

describe('WidgetsService', () => {
  let service: WidgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WidgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
