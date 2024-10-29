import { Component } from '@angular/core';

import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  producto = {
    id: 0,
    nombre: '',
    precio: 0,
    imagenHrefExterno: '',
    descripcion: ''
  };

  productoCreado = false;  // Variable para controlar el mensaje de confirmación
  constructor(private productoService: ProductoService) {}

  onSubmit() {
    this.productoService.addProducto(this.producto);
    this.productoCreado = true;
    console.log('Producto creado:', this.producto);

    this.producto = {
      id: 0,
      nombre: '',
      precio: 0,
      imagenHrefExterno: '',
      descripcion: ''
    };

    setTimeout(() => {
      this.productoCreado = false;
    }, 3000);
  }

}
