"use client";
import { FormEvent, useEffect, useRef } from "react";
import { IProduct } from "@/interfaces/products/products-interface";
import { postProducts, productsSelector } from "@/store/products/products-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

type Props = {
  onToggleForm: () => void;
};

const ProductForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const { productList } = useAppSelector(productsSelector);
  const titleInputElement = useRef<HTMLInputElement>(null);
  const descriptionInputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Rendering Product Form...");
  }, []);

  const handleOnFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!titleInputElement.current || !descriptionInputElement.current) {
      return;
    }

    if (titleInputElement.current.value.length === 0 || descriptionInputElement.current.value.length === 0) {
      alert("Invalid Input for Product Form");
      return;
    }

    const productToAdd: IProduct = {
      id: productList.length + 1,
      title: titleInputElement.current.value,
      description: descriptionInputElement.current.value,
    };

    dispatch(postProducts(productToAdd));
    props.onToggleForm();
  };

  return (
    <div className="d-flex flex-column w-75 mx-auto my-2">
      <form onSubmit={handleOnFormSubmit}>
        <div className="mb-2">
          <input
            ref={titleInputElement}
            className="form-control"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="mb-2">
          <input
            ref={descriptionInputElement}
            className="form-control"
            type="text"
            placeholder="Description"
          />
        </div>
        <div>
          <button
            onClick={props.onToggleForm}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-outline-primary mx-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
