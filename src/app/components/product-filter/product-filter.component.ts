import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/iproduct';
import { ProductFilterService } from '../../services/product-filter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  @Input() products: Product[] = [];  
  @Output() filterProductsEvent = new EventEmitter<Product[]>(); 

  name: string = '';
  category: string = '';
  price: number = 0;
  active: boolean = true;

  constructor(private productFilterService: ProductFilterService) {}

  applyFilters() {
    console.log('Aplicando filtros...', this.products);
    
    const filteredProducts = this.productFilterService.filterProducts(
      this.products,
      this.name,
      this.category,
      this.price,
      this.active
    );

    console.log('Productos filtrados:', filteredProducts);

    this.filterProductsEvent.emit(filteredProducts);  
  }

  clearFilters() {
    this.name = '';
    this.category = '';
    this.price = 0;
    this.active = true;

    this.filterProductsEvent.emit(this.products);
  }
}
