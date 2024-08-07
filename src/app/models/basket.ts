export interface Basket {
  id: number;
  buyerId: string;
  basketItems: BasketItem[];
}

export interface BasketItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
