import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from 'src/app/models/product.model';
import { Component, Input } from '@angular/core';

// Stub para app-button-edit
@Component({
  selector: 'app-button-edit',
  template: ''
})
class ButtonEditStubComponent {
  @Input() product: Product | undefined;
}

// Stub para app-button-remove
@Component({
  selector: 'app-button-remove',
  template: ''
})
class ButtonRemoveStubComponent {
  @Input() product: Product | undefined;
}

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    name: 'Producto de prueba',
    price: 50,
    img: 'https://example.com/image.jpg',
    desc: 'Descripción de prueba'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductCardComponent,
        ButtonEditStubComponent,
        ButtonRemoveStubComponent // Agrega los stubs aquí en el archivo de pruebas
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;  // Asigna un valor al @Input() para evitar undefined
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
