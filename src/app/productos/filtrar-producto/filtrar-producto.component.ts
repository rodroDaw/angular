import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-filtrar-producto',
  templateUrl: './filtrar-producto.component.html',
  styleUrls: ['./filtrar-producto.component.css']
})
export class FiltrarProductoComponent {

  // Filtros
  filtroNombre: string = '';
  filtroPrecioMin: number = 0.01;
  filtroPrecioMax: number = 1000;

  // Productos
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
      this.productosFiltrados = productos;
    });
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter(producto => {
      const nombreCoincide = this.filtroNombre === '' || producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const precioEnRango = producto.precio >= this.filtroPrecioMin && producto.precio <= this.filtroPrecioMax;
      return nombreCoincide && precioEnRango;
    });
  }

  resetearBusqueda() {
    this.filtroNombre = '';
    this.filtroPrecioMin = 0.01;
    this.filtroPrecioMax = 1000;
    this.productosFiltrados = this.productos;
  }

}
