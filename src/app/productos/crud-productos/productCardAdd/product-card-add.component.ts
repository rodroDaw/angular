import { Component } from '@angular/core';

import { ProductoService } from '../../producto.service';
import { Product } from '../../../models/product.model';
import Swal from 'sweetalert2';

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

  showModal = false;

  constructor(private productoService: ProductoService) {}

  onSubmit() {
    this.productoService.addProduct(this.product);

    Swal.fire({
      title: 'Producto creado',
      text: `El producto "${this.product.name}" ha sido creado exitosamente.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'alert alert-success',
        confirmButton: 'btn btn-primary'
      },
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      this.showModal = false;
    });

    //Borrar los inputs del formulario
    this.product = {
      id: 0,
      name: '',
      price: 0,
      img: '',
      desc: ''
    };
  }

  showFormModal(){
    this.showModal = true;
  }

  hiddeModal(){
    this.showModal = false;
  }

}
