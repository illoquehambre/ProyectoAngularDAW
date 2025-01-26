import { Injectable } from '@angular/core';
import { Product } from '../interfaces/iproduct';  

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {

  constructor() {}
  filterProducts(
    products: Product[],
    name: string,
    category: string,
    price: number,
    active: boolean
  ): Product[] {
    return products.filter(product => {
      const matchesName = name ? product.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesCategory = category ? product.category === category : true;
      const matchesPrice = price ? product.price <= price : true;
      const matchesActive = active !== undefined ? product.active === active : true;
      console.log('matchesName:', matchesName);
      console.log('matchesCategory:', matchesCategory);
      console.log('matchesPrice:', matchesPrice);
      console.log('matchesActive:', matchesActive);
      
      return matchesName && matchesCategory && matchesPrice && matchesActive;
    });
  }
}
