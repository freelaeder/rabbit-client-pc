import type { Goods } from "./Goods";
import type { Brands } from "./Brands";

export interface Category {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: Category[] | undefined;
  goods: Goods[] | undefined;
  saleProperties: SaleProperty[];
  brands: Brands[];
}

interface SaleProperty {
  id: string;
  name: string;
  properties: Omit<SaleProperty, "properties">[];
}
