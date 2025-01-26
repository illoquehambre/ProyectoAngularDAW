type ProductCategory = 'hombre' | 'mujer' | 'niño';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  active: boolean;
}
