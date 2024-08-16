export interface Order {
  id: number;
  buyerId: string;
  shippingAddress: ShippingAddress;
  orderDate: string;
  orderItems: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  orderStatus: string;
  total: number;
}

export interface ShippingAddress {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  country: string;
  state: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  pictureUrl: string;
  quantity: number;
  price: number;
}
