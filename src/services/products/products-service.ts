import { IProduct } from "@/interfaces/products/products-interface";

const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch("https://dummyjson.com/products/category/laptops");
  if (response.status !== 200) {
    throw new Error('Failed to get product list.');
  }
  const result: IProduct[] = await response.json();
  return result;
}

const addProducts = async (productToAdd: IProduct): Promise<IProduct> => {
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productToAdd)
  });
  if (response.status !== 200) {
    throw new Error('Failed to add product.');
  }
  return productToAdd;
}

export { getProducts, addProducts }