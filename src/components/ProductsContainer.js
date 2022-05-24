import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../feature/cart/cartSlice";

import Product from "../components/Product";
import SkeletonProduct from "../components/SkeletonProduct";
import ToggleButton from "../components/ToggleButton";

export default function ProductsContainer() {
  const { products, isLoading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
    // eslint-disable-next-line
  }, []);

  if (!!isLoading) {
    return (
      <>
        <section className="products">
          <ToggleButton />
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
        </section>
        <div className="separator"></div>
      </>
    );
  }
  return (
    <>
      <section className="products">
        <ToggleButton />
        {products.map((item) => (
          <Product {...item} key={item._id} />
        ))}
      </section>
      <div className="separator"></div>
    </>
  );
}
