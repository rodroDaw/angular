import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = 'assets/productos.json';
  private productosCache: Producto[] = [];

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    if (this.productosCache.length > 0) {
      // Si los productos ya están en caché, devolverlos como Observable
      return of(this.productosCache);
    } else {
      // Si no están en caché, obtener los datos del archivo JSON y almacenarlos
      return this.http.get<Producto[]>(this.url).pipe(
        map(productos => {
          this.productosCache = productos;
          return productos;
        })
      );
    }
  }

  addProducto(producto: Producto): Observable<Producto> {
    // Asignar un nuevo ID basado en el ID más alto actual o 1 si la lista está vacía
    const nuevoId = this.productosCache.length > 0
      ? Math.max(...this.productosCache.map(p => p.id)) + 1
      : 1;
    const nuevoProducto = { ...producto, id: nuevoId };
    this.productosCache.push(nuevoProducto);
    return of(nuevoProducto);
  }

  /*
  actualizarProducto(id: number, productoActualizado: Producto): Observable<Producto | null> {
    const index = this.productosCache.findIndex(prod => prod.id === id);
    if (index !== -1) {
      this.productosCache[index] = { ...productoActualizado, id };
      return of(this.productosCache[index]);
    } else {
      // Si no se encuentra el producto, devolver null
      return of(null);
    }
  }
    */
}
