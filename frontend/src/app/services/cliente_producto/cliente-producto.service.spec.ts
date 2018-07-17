import { TestBed, inject } from '@angular/core/testing';

import { ClienteProductoService } from './cliente-producto.service';

describe('ClienteProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteProductoService]
    });
  });

  it('should be created', inject([ClienteProductoService], (service: ClienteProductoService) => {
    expect(service).toBeTruthy();
  }));
});
