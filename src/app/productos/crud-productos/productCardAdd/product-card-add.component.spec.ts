import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { Product } from '../../../models/product.model';
import { ProductCardAddComponent } from './product-card-add.component';
import { ProductoService } from '../../producto.service';

describe('ProductCardAddComponent', () => {
  let component: ProductCardAddComponent;
  let fixture: ComponentFixture<ProductCardAddComponent>;
  let productoServiceSpy: jasmine.SpyObj<ProductoService>;

  const mockProduct: Product = {
    id: 1,
    name: 'Producto 1',
    price: 100,
    img: 'imagenHref',
    desc: 'Desc'
  };

  beforeEach(async () => {
    productoServiceSpy = jasmine.createSpyObj('ProductoService', ['addProduct']);
    productoServiceSpy.addProduct.and.returnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      declarations: [ProductCardAddComponent],
      imports: [FormsModule], // Asegúrate de importar FormsModule aquí
      providers: [{ provide: ProductoService, useValue: productoServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a addProduct en ProductoService cuando se envía el formulario', () => {
    component.product = { ...mockProduct };
    component.onSubmit();
    expect(productoServiceSpy.addProduct).toHaveBeenCalledWith(mockProduct);
    expect(component.alertCreate).toBeTrue();
    expect(component.product).toEqual({
      id: 0,
      name: '',
      price: 0,
      img: '',
      desc: ''
    });
  });

  it('debería ocultar alertCreate después de 3 segundos', fakeAsync(() => {
    component.onSubmit();
    expect(component.alertCreate).toBeTrue();
    tick(3000);
    expect(component.alertCreate).toBeFalse();
  }));

  it('debería mostrar el modal cuando showFormModal es llamado', () => {
    component.showFormModal();
    expect(component.showModal).toBeTrue();
  });

  it('debería ocultar el modal cuando hiddeModal es llamado', () => {
    component.showModal = true;
    component.hiddeModal();
    expect(component.showModal).toBeFalse();
  });
});
