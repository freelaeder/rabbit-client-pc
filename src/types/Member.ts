// 我的收藏-响应
export interface CollectionResponse {
  id: string;
  name: string;
  description: string;
  picture: string;
  collectType: 1 | 2 | 3;
  price: string;
  discount: number;
  productionPlace: string;
  detailsUrl: string;
}
// 我的收藏-参数
export interface CollectionParams {
  page: number;
  pageSize: number;
  collectType: 1 | 2 | 3;
}
