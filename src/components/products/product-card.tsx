import { IProduct } from "@/interfaces/products/products-interface";
import Image from "next/image";

const ProductCard = (product: IProduct) => {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center my-auto">
      <Image src={product.thumbnail ?? "/no-image.svg"} alt="product" priority className="m-2 rounded-circle" width={150} height={150} />
      <div className="d-flex flex-column align-items-center w-100">
        <h6>{product.title}</h6>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
