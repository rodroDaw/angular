import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ButtonEditComponent } from './button-edit.component';
import { ProductoService } from '../../../../productos/producto.service';
import { Product } from 'src/app/models/product.model';

describe('ButtonEditComponent', () => {
  let component: ButtonEditComponent;
  let fixture: ComponentFixture<ButtonEditComponent>;
  let productoServiceSpy: jasmine.SpyObj<ProductoService>;

  const mockProduct: Product = {
    id: 1,
    name: 'Producto 1',
    price: 100,
    img: 'imagenHref',
    desc: 'Desc'
  };

  beforeEach(async () => {
    productoServiceSpy = jasmine.createSpyObj('ProductoService', ['updateProduct']); // Simular método si es necesario

    await TestBed.configureTestingModule({
      imports: [FormsModule], // Asegúrate de importar FormsModule aquí
      declarations: [ButtonEditComponent],
      providers: [{ provide: ProductoService, useValue: productoServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonEditComponent);
    component = fixture.componentInstance;
    component.product = { ...mockProduct }; // Inicializa el producto
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería ocultar el modal y actualizar los valores de product', () => {
    component.product = { ...mockProduct }; // Asegura que el producto esté inicializado

    // Configura currentProduct con nuevos valores para simular la actualización
    component.currentProduct = { ...mockProduct, name: 'Nuevo Nombre', desc: 'Nueva Descripción', img: 'nuevaImg', price: 200 };

    component.hiddeModalUpdate(); // Llama al método que debe actualizar y cerrar el modal

    expect(component.showModal).toBeFalse(); // Confirma que el modal está cerrado
    expect(component.product?.name).toBe('Nuevo Nombre');
    expect(component.product?.desc).toBe('Nueva Descripción');
    expect(component.product?.img).toBe('nuevaImg');
    expect(component.product?.price).toBe(200);
  });

  it('debería mostrar el modal y copiar el producto actual a currentProduct', () => {
    component.product = { ...mockProduct }; // Asegúrate de que el producto esté definido

    component.showFormModalUpdate(component.product.id);

    expect(component.showModal).toBeTrue(); // Verifica que el modal esté visible
    expect(component.currentProduct).toEqual(mockProduct); // Verifica que currentProduct sea una copia de product
  });

  it('debería mantener el valor de currentProduct si falta algún valor en product', () => {
    // Dejamos el campo de nombre vacío en el producto
    component.product = { ...mockProduct, name: '', img: '', price: 0 };

    // Inicializamos currentProduct para ver si se conservan sus valores
    component.currentProduct = { ...mockProduct };
    component.inputValid();

    expect(component.product?.name).toBe(mockProduct.name);
    expect(component.product?.img).toBe(mockProduct.img);
    expect(component.product?.price).toBe(mockProduct.price);
  });


  it('debería cerrar el modal al llamar updateValid', () => {
    component.showModal = true; // Asegura que el modal esté visible

    component.updateValid();

    expect(component.showModal).toBeFalse(); // Verifica que el modal se haya ocultado
  });

  it('no debería lanzar error si currentProduct es null al llamar hiddeModalUpdate', () => {
    component.currentProduct = null; // Asegura que currentProduct es null
    component.showModal = true; // Asegura que el modal esté abierto

    expect(() => component.hiddeModalUpdate()).not.toThrow(); // No debería lanzar error
    expect(component.showModal).toBeFalse(); // Verifica que el modal se haya cerrado
  });

  it('debería actualizar el nombre del producto al cambiar el valor en el formulario', () => {
    fixture.detectChanges(); // Detección de cambios inicial

    const input = fixture.nativeElement.querySelector('input[name="name"]');
    input.value = 'Nuevo Nombre';
    input.dispatchEvent(new Event('input')); // Simula el cambio

    expect(component.product?.name).toBe('Nuevo Nombre'); // Verifica que se actualice el valor
  });






});
