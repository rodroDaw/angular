import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ngModel

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CrudProductosComponent } from './crud-productos/crud-productos.component';
import { ListComponent } from './crud-productos/productList/list.component';
import { FilterComponent } from './crud-productos/productFilter/filter.component';
import { ProductCardComponent } from './crud-productos/productCard/product-card.component';
import { ProductCardAddComponent } from './crud-productos/productCardAdd/product-card-add.component';
import { ButtonEditComponent } from './crud-productos/productCard/button-edit/button-edit.component';
import { ButtonRemoveComponent } from './crud-productos/productCard/button-remove/button-remove.component';


@NgModule({
  declarations: [
    CrudProductosComponent,
    ListComponent,
    FilterComponent,
    ProductCardComponent,
    ProductCardAddComponent,
    ButtonRemoveComponent,
    ButtonEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule

  ],
  exports: [
    CrudProductosComponent // Exporta si necesitas utilizar este componente en otros módulos
  ]
})
export class ProductosModule { }
