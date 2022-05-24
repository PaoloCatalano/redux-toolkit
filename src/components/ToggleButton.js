import { openCart, closeCart } from "../feature/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ToggleButton() {
  const { isCartOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  return (
    <div className="toggleBtn">
      {!isCartOpen ? (
        <button onClick={() => dispatch(openCart())}>Cart &#8592;</button>
      ) : (
        <button onClick={() => dispatch(closeCart())}>Close</button>
      )}
    </div>
  );
}
