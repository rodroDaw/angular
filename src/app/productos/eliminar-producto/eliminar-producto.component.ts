import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  productos: Producto[] = [];
  modalForDelete = false;
  productoTemporal: { id: number; nombre: string; precio: number; imagenHrefExterno: string; descripcion: string } | null | undefined;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((data: Producto[]) => {
      this.productos = data;  // Asignamos los productos obtenidos al array
    });
  }

  eliminarProducto(id: number): void {
    this.modalForDelete = true;
    const productoOriginal = this.productos.find(producto => producto.id === id);
    this.productoTemporal = productoOriginal ? { ...productoOriginal } : null;
  }

  removePermanent(): void {
    const index = this.productos.findIndex(producto => producto.id === this.productoTemporal?.id);
    if (index !== -1) {
      this.productos.splice(index, 1);
    }
    this.modalForDelete = false;
  }

  hiddeModal(){
    this.modalForDelete = false;
  }
}
