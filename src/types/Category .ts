import type { Goods } from "./Goods";
export interface Category {
    id: string;
    name: string;
    picture: string;
    children: Category[] | undefined;
    goods: Goods[] | undefined;
  }