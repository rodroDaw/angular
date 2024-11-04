import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = 'assets/productos.json';

  private productCache: Product[] = [];
  private productCacheFiltered: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (this.productCache.length > 0) {
      // Si los productos ya están en caché, devolverlos como Observable
      this.productCacheFiltered = this.productCache;
      return of(this.productCache);
    } else {
      // Si no están en caché, obtener los datos del archivo JSON y almacenarlos
      return this.http.get<Product[]>(this.url).pipe(
        map(productos => {
          this.productCacheFiltered = productos;
          this.productCache = productos;
          return productos;
        })
      );
    }
  }

  addProduct(producto: Product): Observable<Product> {
    // Asignar un nuevo ID basado en el ID más alto actual o 1 si la lista está vacía
    const nuevoId = this.productCache.length > 0
      ? Math.max(...this.productCache.map(p => p.id)) + 1
      : 1;
    const nuevoProducto = { ...producto, id: nuevoId };
    this.productCache.push(nuevoProducto);
    return of(nuevoProducto);
  }

  removeProduct(productRemove: Product) {
    const index = this.productCache.findIndex(product => product.id === productRemove.id);
    if (index !== -1) {
        this.productCache.splice(index, 1);
    }
}

}
