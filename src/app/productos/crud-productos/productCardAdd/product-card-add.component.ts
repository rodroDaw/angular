import { Component } from '@angular/core';

import { ProductoService } from '../../producto.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card-add',
  templateUrl: './product-card-add.component.html',
  styleUrls: ['./product-card-add.component.css']
})
export class ProductCardAddComponent {

  product = {
    id: 0,
    name: '',
    price: 0,
    img: '',
    desc: ''
  };

  alertCreate = false;
  showModal = false;

  constructor(private productoService: ProductoService) {}

  onSubmit() {
    this.productoService.addProduct(this.product);
    this.alertCreate = true;
    this.product = {
      id: 0,
      name: '',
      price: 0,
      img: '',
      desc: ''
    };

    setTimeout(() => {
      this.alertCreate = false;
    }, 3000);
  }

  showFormModal(){
    this.showModal = true;
  }

  hiddeModal(){
    this.showModal = false;
  }

}
