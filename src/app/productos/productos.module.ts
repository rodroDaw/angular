import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
/*
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { FiltrarProductoComponent } from './filtrar-producto/filtrar-producto.component';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

*/


@NgModule({
  declarations: [
    /*
    CrearProductoComponent,
    FiltrarProductoComponent,
    EliminarProductoComponent
    */
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
