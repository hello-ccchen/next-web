import { NextResponse } from "next/server";
import { IProduct } from "@/interfaces/products/products-interface";
import { addProducts, getProducts } from "@/services/products/products-service";

const GET = async () => {
  try {
    const result = await getProducts();
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

const POST = async(req: Request) => {
  try {
    const productToAdd: IProduct = await req.json();
    const result = await addProducts(productToAdd);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export { GET, POST };