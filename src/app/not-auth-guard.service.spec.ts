import { TestBed, inject } from '@angular/core/testing';

import { NotAuthGuardService } from './not-auth-guard.service';

describe('NotAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotAuthGuardService]
    });
  });

  it('should ...', inject([NotAuthGuardService], (service: NotAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
