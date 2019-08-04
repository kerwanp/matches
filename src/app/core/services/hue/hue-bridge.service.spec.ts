import { TestBed } from '@angular/core/testing';

import { HueBridgeService } from './hue-bridge.service';

describe('HueBridgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HueBridgeService = TestBed.get(HueBridgeService);
    expect(service).toBeTruthy();
  });
});
