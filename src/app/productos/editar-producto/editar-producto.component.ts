import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  productos: Producto[] = [];
  productoEditando: number | null = null; // index for in html

  producto = {
    id: 0,
    nombre: '',
    precio: 0,
    imagenHrefExterno: '',
    descripcion: ''
  };
  productoTemporal: { id: number; nombre: string; precio: number; imagenHrefExterno: string; } | null | undefined;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }

  activarEdicion(index: number, idProducto: number) {
    this.productoEditando = index;
    // Copia buena del producto encontrado en lugar de una referencia
    const productoOriginal = this.productos.find(producto => producto.id === idProducto);
    this.productoTemporal = productoOriginal ? { ...productoOriginal } : null;
  }

  validarInput(idProducto: number) {
    let productoAux = this.productos.find(producto => producto.id === idProducto);
    if (productoAux != undefined) {
      if (productoAux.imagenHrefExterno === "" && this.productoTemporal != undefined) {
        productoAux.imagenHrefExterno = this.productoTemporal.imagenHrefExterno;
      }
      if (productoAux.nombre === "" && this.productoTemporal != undefined) {
        productoAux.nombre = this.productoTemporal.nombre;
      }
      if (productoAux.precio === undefined && this.productoTemporal != undefined) {
        productoAux.precio = this.productoTemporal.precio;
      }
    }
  }

  /*
  validarInput(idProducto: number){
    console.log('ON CHANGE !!!!!!!!!!!!!! ' + idProducto);

    let productoAux = this.productos.find(producto => producto.id === idProducto);

    if(productoAux!=undefined){
      if(productoAux?.imagenHrefExterno=="" && this.productoTemporal!=undefined){
        productoAux.imagenHrefExterno = this.productoTemporal.imagenHrefExterno;
      }
      if(productoAux?.nombre=="" && this.productoTemporal!=undefined){
        console.log('entra????')
        productoAux.nombre = this.productoTemporal.nombre;
      }
      if(productoAux?.precio==undefined && this.productoTemporal!=undefined){
        productoAux.precio = this.productoTemporal.precio;
      }
    }

    console.log(productoAux);
  }
    */

  /*
  onSubmit() {
    this.productoService.actualizarProducto(this.producto.id, this.producto).subscribe({
      next: () => {
        this.productoEditando = null;
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
      }
    });
  }
    */
}
