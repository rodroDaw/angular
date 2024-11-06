import { Component, Input } from '@angular/core';

import { Product } from 'src/app/models/product.model';

import { ProductoService } from '../../../../productos/producto.service';
import Swal from 'sweetalert2';

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
    if (this.product != undefined) {
      Swal.fire({
        title: 'Producto actualizado',
        text: `El producto "${this.product.name}" ha sido actualizado exitosamente.`,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alert alert-primary',
          confirmButton: 'btn btn-primary'
        },
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        this.showModal = false;
      });

      this.showModal = false;
    }
  }

  hiddeModalUpdate() {
    if (this.product != undefined && this.currentProduct != undefined) {
      this.product.name = this.currentProduct.name;
      this.product.desc = this.currentProduct.desc;
      this.product.img = this.currentProduct.img;
      this.product.price = this.currentProduct.price;
    }
    this.showModal = false;
  }


}
