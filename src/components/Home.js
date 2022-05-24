import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";

export default function Home() {
  return (
    <div className="home">
      <ProductsContainer />
      <CartContainer />
    </div>
  );
}
