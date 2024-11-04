import { Component, Input } from '@angular/core';

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

  alertRemove = false;
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
    if(this.currentProduct!=null){
      this.productoService.removeProduct(this.currentProduct);
      this.alertRemove = true;

      setTimeout(() => {
        this.alertRemove = false;
      }, 3000);
    }
  }

}
