import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaProductosComponent } from './productos/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { FiltrarProductoComponent } from './productos/filtrar-producto/filtrar-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';

const routes: Routes = [
  { path: '', component: ListaProductosComponent },
  { path: 'productos', component: ListaProductosComponent },
  { path: 'productos/crear', component: CrearProductoComponent },
  { path: 'productos/filtrar', component: FiltrarProductoComponent },
  { path: 'productos/editar', component: EditarProductoComponent },
  { path: 'productos/eliminar', component: EliminarProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
