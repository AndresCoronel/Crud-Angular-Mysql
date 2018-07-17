import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProductoComponent } from './cliente-producto.component';

describe('ClienteProductoComponent', () => {
  let component: ClienteProductoComponent;
  let fixture: ComponentFixture<ClienteProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
