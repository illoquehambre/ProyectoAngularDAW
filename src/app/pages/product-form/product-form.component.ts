import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/iproduct';
import { v4 as uuidv4 } from 'uuid';
import { SProductService } from '../../services/sproduct.service';  
import { Router } from '@angular/router';  

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  imports: [ReactiveFormsModule]
})
export class ProductFormComponent {
  formGroup!: FormGroup;
  categories = ['hombre', 'mujer', 'niño']; 
  constructor(private productService: SProductService, private router: Router) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      active: new FormControl(true) 
    });
  }

  ngOnInit(): void {
    let exampleProduct: Product = {
      _id: uuidv4(),
      name: 'Camiseta Deportiva',
      description: 'Camiseta de entrenamiento para hombre, material transpirable.',
      price: 29.99,
      category: 'hombre',
      image: 'https://example.com/camiseta.jpg',
      active: true
    };

    this.formGroup.setValue({
      name: exampleProduct.name,
      description: exampleProduct.description,
      price: exampleProduct.price,
      category: exampleProduct.category,
      image: exampleProduct.image,
      active: exampleProduct.active
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const newProduct: Product = { 
        ...this.formGroup.value, 
        _id: uuidv4() 
      };

      this.productService.createProduct(newProduct)
        .then(data => {
          console.log('Producto creado:', data);
          this.formGroup.reset();
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('Error al crear el producto:', error);
        });
    }
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.formGroup.get(formControlName)?.hasError(validator) &&
      this.formGroup.get(formControlName)?.touched;
  }
}
