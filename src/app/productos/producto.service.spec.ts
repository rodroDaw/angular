import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';
import { Product } from '../models/product.model';
import { of } from 'rxjs';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  //getProducts()
  it('debería devolver productos de la caché si están presentes', (done) => {
    const mockProductos: Product[] = [{ id: 1, name: 'Producto prueba', price: 2.0, desc: "Desc", img: "imghref" }];
    service['productCache'] = mockProductos; // Inyectar directamente en la caché

    service.getProducts().subscribe((productos) => {
      expect(productos).toEqual(mockProductos);
      done();
    });
  });

  //getProducts()
  it('debería realizar una petición HTTP si la caché está vacía', (done) => {
    const mockProductos: Product[] = [{ id: 1, name: 'Producto prueba', price: 2.0, desc: "Desc", img: "imghref" }];

    service.getProducts().subscribe((productos) => {
      expect(productos).toEqual(mockProductos);
      expect(service['productCache']).toEqual(mockProductos); // Asegurarse de que la caché se llenó
      done();
    });

    const req = httpMock.expectOne('assets/productos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });

  //addProduct()
  it('debería añadir un producto y asignarle un ID nuevo', (done) => {
    const mockProducto: Product = { id: 1, name: 'Producto prueba', price: 2.0, desc: "Desc", img: "imghref" }
    const expectedId = service['productCache'].length > 0
      ? Math.max(...service['productCache'].map(p => p.id)) + 1
      : 1;

    service.addProduct(mockProducto).subscribe((producto) => {
      expect(producto.id).toBe(expectedId);
      expect(service['productCache']).toContain(producto);
      done();
    });
  });

  //removeProduct()
  it('debería eliminar un producto de la caché', () => {
    const mockProductos: Product[] = [{ id: 1, name: 'Producto prueba', price: 2.0, desc: "Desc", img: "imghref" }];
    service['productCache'] = [...mockProductos]; // Agregar productos a la caché

    service.removeProduct({ id: 1, name: 'Producto prueba', price: 2.0, desc: "Desc", img: "imghref" });
    expect(service['productCache'].length).toBe(1);
    expect(service['productCache'][0].id).toBe(2);
  });

  //verificar que no se eliminen productos si el ID no existe en la caché
  it('no debería eliminar un producto si el ID no existe en la caché', () => {
    const mockProductos: Product[] = [{ id: 1, name: 'Producto prueba', price: 2.0, desc: "Desc", img: "imghref" }];
    service['productCache'] = [...mockProductos];

    service.removeProduct({ id: 999, name: 'Producto Inexistente prueba', price: 2.0, desc: "Desc", img: "imghref" });
    expect(service['productCache'].length).toBe(1); // No debe cambiar
    expect(service['productCache'][0].id).toBe(1);
  });




});


