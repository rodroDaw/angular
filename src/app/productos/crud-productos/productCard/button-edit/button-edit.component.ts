import { Component, Input } from '@angular/core';

import { Product } from 'src/app/models/product.model';

import { ProductoService } from '../../../../productos/producto.service';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.css']
})
export class ButtonEditComponent {

  @Input() product: Product | undefined;
  currentProduct: { id: number; name: string; price: number; img: string; desc: string } | null | undefined;

  alertUpdate = false;
  showModal = false;

  constructor(private productoService: ProductoService) {}

  showFormModalUpdate(id: number | undefined): void {
    // Copia buena del producto encontrado en lugar de una referencia
    const productOriginal = this.product;
    this.currentProduct = productOriginal ? { ...productOriginal } : null;
    this.showModal = true;
  }

  inputValid(){
    if (this.product != undefined) {
      if (this.product.img === "" && this.currentProduct != undefined) {
        this.product.img = this.currentProduct.img;
      }
      if (this.product.name === "" && this.currentProduct != undefined) {
        this.product.name = this.currentProduct.name;
      }
      if (this.product.price === undefined && this.currentProduct != undefined) {
        this.product.price = this.currentProduct.price;
      }
    }
  }

  updateValid(){
    this.showModal = false;
  }

  hiddeModalUpdate(){
    if (this.product != undefined) {
      if (this.product.img === "" && this.currentProduct != undefined) {
        this.product.img = this.currentProduct.img;
      }
      if (this.product.name === "" && this.currentProduct != undefined) {
        this.product.name = this.currentProduct.name;
      }
      if (this.product.price === undefined && this.currentProduct != undefined) {
        this.product.price = this.currentProduct.price;
      }
    }
    this.showModal = false;
  }
}
