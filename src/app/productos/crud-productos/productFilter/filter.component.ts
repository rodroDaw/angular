import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { ProductoService } from '../../producto.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent{
  @Input() productsList: Product[] = []; // Lista de productos sin cambios
  productsFiltered: Product[] = []; // Lista filtrada

  @Output() productsFilteredEmmitter: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  // Filtros
  nameFilter: string = '';
  priceFilterMin: number | null = 0.01;
  priceFilterMax: number | null = 1000;
  //componInterval: Subscription | undefined;

  constructor(private productoService: ProductoService) { }

  onSubmitInterval(event: Event){
    this.filterProducts();
  }

  filterProducts() {
    this.productsFiltered = this.productsList.filter(product => {
      if(this.priceFilterMin!=null && this.priceFilterMax!=null){
        const nombreCoincide = this.nameFilter === '' || product.name.toLowerCase().includes(this.nameFilter.toLowerCase());
        const precioEnRango = product.price >= this.priceFilterMin && product.price <= this.priceFilterMax;

        console.log(nombreCoincide && precioEnRango)
        return nombreCoincide && precioEnRango;
      }
      return this.productsList;
    });
    this.productsFilteredEmmitter.emit(this.productsFiltered);
  }

  resetSearch() {
    this.nameFilter = '';
    this.priceFilterMin = 0.01;
    this.priceFilterMax = 1000;
    this.productsFiltered = this.productsList;
    this.productsFilteredEmmitter.emit(this.productsFiltered);
  }
}
