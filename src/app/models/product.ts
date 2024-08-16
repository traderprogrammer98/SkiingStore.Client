export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
}

export interface ProductParams {
  sortBy: string;
  search?: string;
  types: string[];
  brands: string[];
  pageNumber: number;
  pageSize: number;
}
