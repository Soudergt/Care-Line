import { TestBed } from '@angular/core/testing';

import { CaretakerService } from './caretaker.service';

describe('CaretakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaretakerService = TestBed.get(CaretakerService);
    expect(service).toBeTruthy();
  });
});
