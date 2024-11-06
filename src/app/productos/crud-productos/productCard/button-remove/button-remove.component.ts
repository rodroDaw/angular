import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';

import { Product } from 'src/app/models/product.model';

import { ProductoService } from '../../../../productos/producto.service';

@Component({
  selector: 'app-button-remove',
  templateUrl: './button-remove.component.html',
  styleUrls: ['./button-remove.component.css']
})
export class ButtonRemoveComponent {

  @Input() product: Product | undefined;
  currentProduct: { id: number; name: string; price: number; img: string; desc: string } | null | undefined;

  showModal = false;

  constructor(private productoService: ProductoService) {}

  showFormModal(id: number | undefined): void {
    this.showModal = true;
    this.currentProduct = this.product;
  }

  hiddeModal(){
    this.showModal = false;
  }

  removePermanent() {
    if (this.currentProduct != null) {
      this.productoService.removeProduct(this.currentProduct);
      Swal.fire({
        title: 'Producto eliminado',
        text: `El producto "${this.currentProduct.name}" ha sido eliminado exitosamente.`,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alert alert-danger',
          confirmButton: 'btn btn-primary'
        },
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        this.showModal = false;
      });

    }
  }

}
