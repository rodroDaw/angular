import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { ButtonRemoveComponent } from './button-remove.component';
import { ProductoService } from '../../../../productos/producto.service';
import { Product } from 'src/app/models/product.model';

describe('ButtonRemoveComponent', () => {
  let component: ButtonRemoveComponent;
  let fixture: ComponentFixture<ButtonRemoveComponent>;
  let productoServiceSpy: jasmine.SpyObj<ProductoService>;

  const mockProduct: Product = {
    id: 1,
    name: 'Producto 1',
    price: 100,
    img: 'imagenHref',
    desc: 'Desc'
  };

  beforeEach(async () => {
    productoServiceSpy = jasmine.createSpyObj('ProductoService', ['removeProduct']);

    await TestBed.configureTestingModule({
      declarations: [ButtonRemoveComponent],
      providers: [{ provide: ProductoService, useValue: productoServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRemoveComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el modal al llamar a showFormModal', () => {
    component.showFormModal(mockProduct.id);
    expect(component.showModal).toBeTrue();
    expect(component.currentProduct).toEqual(mockProduct);
  });

  it('debería ocultar el modal al llamar a hiddeModal', () => {
    component.showFormModal(mockProduct.id);  // Abrimos el modal primero
    component.hiddeModal();
    expect(component.showModal).toBeFalse();
  });

});
