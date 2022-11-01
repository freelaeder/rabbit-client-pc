// src/types/Order.ts
// 创建订单时返回的订单对象
export interface OrderOfCreateResponse {
  userAddresses: Address[];
  goods: Goods[];
  summary: Summary;
}
// 用户的收货地址列表
export interface Address {
  id: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  address: string;
  isDefault: number;
  receiver: string;
  contact: string;
  fullLocation: string;
  postalCode: string;
}
// 订单中的商品列表
export interface Goods {
  id: string;
  name: string;
  picture: string;
  count: number;
  skuId: string;
  attrsText: string;
  price: string;
  payPrice: string;
  totalPrice: string;
  totalPayPrice: string;
}
// 订单中的结算信息
export interface Summary {
  goodsCount: number;
  totalPrice: number;
  totalPayPrice: number;
  postFee: number;
  discountPrice: number;
}

// 添加/修改收货地址的请求参数
export interface EditAddressObject {
  // 修改时使用
  id?: string;
  // 修改时使用
  fullLocation?: string;
  receiver: string;
  contact: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  address: string;
  postalCode: string;
  addressTags: string;
  isDefault: boolean | number;
}
