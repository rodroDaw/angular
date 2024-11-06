import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ListComponent } from './list.component';
import { Product } from '../../../models/product.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Producto 1', price: 100, img: "imgHref", desc: "desc" }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería recibir correctamente el valor de productsList como @Input', () => {
    // Asigna el valor de `productsList` directamente
    component.productsList = mockProducts;

    // Actualiza el template y verifica
    fixture.detectChanges();
    expect(component.productsList).toEqual(mockProducts);
  });
});
