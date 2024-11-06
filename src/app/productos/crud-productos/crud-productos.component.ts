import { Component } from '@angular/core';

import { ProductoService } from '../producto.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.css']
})

export class CrudProductosComponent {

  productsList: Product[] = [];           //original
  productsListShow: Product[] = [];       //mostramos
  //productosCacheFiltrados: Product[] = [];

  //loader
  loading: boolean = false;
  //alerts
  alertCreate = false;

  constructor(private productoService: ProductoService) { }

  getListFilter(productosFiltrados: Product[]){
    this.productsListShow = productosFiltrados;
  }

  ngOnInit(): void {
    this.loading = true;
    this.productoService.getProducts().subscribe((data: Product[]) => {
      this.productsList = data;
      this.productsListShow = this.productsList;
      this.loading = false;
    });
  }

}
