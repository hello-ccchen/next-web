"use client";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProducts, productsSelector } from "@/store/products/products-slice";
import ProductCard from "@/components/products/product-card";
import ProductForm from "@/components/products/product-form";
import styles from "./page.module.css";

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const { productList, isLoading, error } = useAppSelector(productsSelector);

  useEffect(() => {
    dispatch(fetchProducts());
    console.log("Rendering Product Page...");
  }, []);

  const onToggleProductForm = useCallback(() => {
    setShowProductForm((prevState) => !prevState);
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (productList.length === 0 || error) return <h1>Uh-oh, no data</h1>;

  return (
    <div className={`d-flex flex-column ${styles.container}`}>
      {status === "authenticated" && (
        <div className="mx-auto my-2 w-75 d-flex justify-content-start">
          <button className="btn btn-primary" onClick={onToggleProductForm}>
            Add Product
          </button>
        </div>
      )}

      {showProductForm && <ProductForm onToggleForm={onToggleProductForm} />}

      <div className={`row mx-auto w-75 ${styles.container}`}>
        {productList.map((product) => (
          <div className="col-sm-4" key={product.id + product.title}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
