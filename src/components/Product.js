import { useDispatch } from "react-redux";
import { addItem } from "../feature/cart/cartSlice";
import { openCart } from "../feature/modal/modalSlice";

export default function Product({ name, price, image, _id }) {
  const dispatch = useDispatch();

  return (
    <center style={{ width: 200, marginBottom: "5rem" }}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>{price}€</p>

      <button
        className="btn"
        onClick={() => {
          dispatch(openCart());
          dispatch(addItem({ _id }));
        }}
      >
        add to cart
      </button>
    </center>
  );
}
