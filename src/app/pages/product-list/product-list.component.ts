import { Component } from '@angular/core';
import { Product } from '../../interfaces/iproduct';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ProductFilterComponent } from "../../components/product-filter/product-filter.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  ngOnInit(): void {
    this.fetchProducts();
  }

  async fetchProducts(): Promise<void> {
    try {
      const response = await fetch('https://jsonblob.com/api/1332672736753016832');
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data: Product[] = await response.json();
      this.products = data;
      this.filteredProducts = data;  
    } catch (error) {
      console.error('Error:', error);
    }
  }

  onFilterProducts(filtered: Product[]) {
    this.filteredProducts = filtered;
  }
}
