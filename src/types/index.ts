export interface Category {
  id: string;
  name: string;
  sort_order: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  price: number;
  sort_order: number;
}

export interface ProductOption {
  id: string;
  product_id: string;
  name: string;
  price: number;
  option_type: 'counter' | 'variation';
  sort_order?: number;
  grid_position: number;
}

export interface CartItem {
  product: Product;
  options: ProductOption[];
  quantity: number;
}
