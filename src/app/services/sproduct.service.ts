import { Injectable } from '@angular/core';
import { Product } from '../interfaces/iproduct';
import { v4 as uuidv4 } from 'uuid';  

@Injectable({
  providedIn: 'root'
})
export class SProductService {
  private apiUrl: string = 'https://jsonblob.com/api/1332672736753016832';
  constructor() { }
  async  createProduct(newProduct: Product): Promise<any> {
    return fetch(this.apiUrl)
      .then(response => response.json())  
      .then((existingProducts: Product[]) => {
        const productWithId = { ...newProduct, _id: uuidv4() }; 
        existingProducts.push(productWithId);

        return fetch(this.apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(existingProducts),  
        });
      })
      .then(response => response.json())
      .catch(error => {
        console.error('Error al actualizar los productos:', error);
        throw error;  
      });
  }

}
