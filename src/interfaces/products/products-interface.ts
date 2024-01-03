export interface IProduct {
  id?: number;
  title: string;
  description: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
}

export interface IProductState {
  productList: IProduct[];
  isLoading: boolean;
  error: string | undefined;
}