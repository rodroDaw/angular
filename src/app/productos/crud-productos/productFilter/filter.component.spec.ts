import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FilterComponent } from './filter.component';
import { ProductoService } from '../../producto.service';
import { Product } from '../../../models/product.model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let productoServiceSpy: jasmine.SpyObj<ProductoService>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Producto prueba1', price: 50.0, desc: "Desc", img: "imghref" },
    { id: 2, name: 'Producto prueba2', price: 200.0, desc: "Desc", img: "imghref" },
    { id: 3, name: 'Producto prueba3', price: 500.0, desc: "Desc", img: "imghref" },
  ];

  beforeEach(async () => {
    productoServiceSpy = jasmine.createSpyObj('ProductoService', ['getProducts']);
    productoServiceSpy.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.productsList = mockProducts;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería filtrar productos correctamente según nameFilter y priceFilter', () => {
    component.nameFilter = 'Producto prueba2';
    component.priceFilterMin = 100;
    component.priceFilterMax = 600;

    component.filterProducts();
    fixture.detectChanges();

    // Comprobamos los productos filtrados
    expect(component.productsFiltered).toEqual([{ id: 2, name: 'Producto prueba2', price: 200.0, desc: "Desc", img: "imghref" }]);
  });

  it('debería emitir productos filtrados correctamente', () => {
    // Espía para el emisor
    spyOn(component.productsFilteredEmmitter, 'emit');

    // Configuramos los filtros y ejecutamos el filtrado
    component.nameFilter = 'Producto';
    component.priceFilterMin = 50;
    component.priceFilterMax = 1000;
    component.filterProducts();
    fixture.detectChanges();

    // Verificamos que se emite el resultado filtrado
    expect(component.productsFilteredEmmitter.emit).toHaveBeenCalledWith(component.productsFiltered);
  });

  it('debería resetear los filtros y productos con resetSearch', () => {
    // Modificamos los filtros antes de resetear
    component.nameFilter = 'Producto prueba1';
    component.priceFilterMin = 100;
    component.priceFilterMax = 500;

    // Llamamos a resetSearch
    component.resetSearch();
    fixture.detectChanges();

    // Verificamos que los filtros y productos filtrados se restablezcan a los valores iniciales
    expect(component.nameFilter).toBe('');
    expect(component.priceFilterMin).toBe(0.01);
    expect(component.priceFilterMax).toBe(1000);
    expect(component.productsFiltered).toEqual(mockProducts);
    expect(component.productsFilteredEmmitter.emit).toHaveBeenCalledWith(mockProducts);
  });
});
