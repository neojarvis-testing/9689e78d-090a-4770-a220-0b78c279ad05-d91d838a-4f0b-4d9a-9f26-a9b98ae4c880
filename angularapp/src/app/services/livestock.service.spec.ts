import { TestBed } from '@angular/core/testing';

import { LivestockService } from './livestock.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('LivestockService', () => {
  let service: LivestockService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LivestockService);
    
  });

  fit('Frontend_should_create_livestock_service', () => {
    expect(service).toBeTruthy();
  });
});
