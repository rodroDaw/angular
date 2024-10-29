import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((data: Producto[]) => {
      this.productos = data;  // Asignamos los productos obtenidos al array
    });
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }
}
