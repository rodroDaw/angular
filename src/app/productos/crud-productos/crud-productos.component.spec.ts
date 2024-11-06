import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CrudProductosComponent } from './crud-productos.component';
import { ProductoService } from '../producto.service';
import { Product } from '../../models/product.model';

describe('CrudProductosComponent', () => {
  let component: CrudProductosComponent;
  let fixture: ComponentFixture<CrudProductosComponent>;
  let productoServiceSpy: jasmine.SpyObj<ProductoService>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Producto prueba1', price: 2.0, desc: "Desc", img: "imghref" }
  ];

  beforeEach(waitForAsync(() => {
    // Crea un espía para ProductoService
    productoServiceSpy = jasmine.createSpyObj('ProductoService', ['getProducts']);

    // Configura el espía para devolver un Observable con productos simulados
    productoServiceSpy.getProducts.and.returnValue(of(mockProducts));

    // Configura el módulo de prueba
    TestBed.configureTestingModule({
      declarations: [CrudProductosComponent],
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy }
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el loading en true y luego en false al cargar productos', () => {
    expect(component.loading).toBeTrue();

    component.ngOnInit();
    fixture.detectChanges();

    expect(productoServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.productsList).toEqual(mockProducts);
    expect(component.productsListShow).toEqual(mockProducts);
    expect(component.loading).toBeFalse();
  });

  it('debería actualizar productsListShow con getListFilter', () => {
    const filteredProducts: Product[] = [
      { id: 1, name: 'Producto actualizado', price: 2.0, desc: "Desc", img: "imghref" }
    ];

    component.getListFilter(filteredProducts);
    expect(component.productsListShow).toEqual(filteredProducts);
  });

  it('debería activar alertCreate en false por defecto', () => {
    expect(component.alertCreate).toBeFalse();
  });
});
