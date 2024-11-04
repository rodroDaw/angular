import { Component, Input } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-listado',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent {
  @Input() productsList: Product[] = [];
}
