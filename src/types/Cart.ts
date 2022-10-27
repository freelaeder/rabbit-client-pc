// src/types/Cart.ts
export interface Cart {
  id: string;
  name: string;
  skuId: string;
  attrsText: string;
  picture: string;
  price: string;
  nowPrice: string;
  selected: boolean;
  stock: number;
  count: number;
  discount: number;
  isCollect: boolean;
  isEffective: boolean;
}
