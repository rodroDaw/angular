import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudProductosComponent } from './productos/crud-productos/crud-productos.component';

const routes: Routes = [
  { path: '', component: CrudProductosComponent }

  /*
  { path: 'productos', component: ListaProductosComponent },
  { path: 'productos/crear', component: CrearProductoComponent },
  { path: 'productos/editar', component: EditarProductoComponent },
  { path: 'productos/eliminar', component: EliminarProductoComponent },
   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
