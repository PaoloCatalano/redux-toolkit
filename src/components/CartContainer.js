import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../feature/modal/modalSlice";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart);
  const { isCartOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (amount < 1) {
    return (
      <section className={isCartOpen ? "cart" : "cart hidden"}>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className={isCartOpen ? "cart" : "cart hidden"}>
      <aside
        style={{
          maxWidth: "80vw",
        }}
      >
        {/* cart header */}
        <header>
          <h2>your bag</h2>
        </header>
        {/* cart items */}
        <div>
          {cartItems.map((item) => {
            return <CartItem key={item._id} {...item} />;
          })}
        </div>
        {/* cart footer */}
        <footer>
          <hr />
          <div className="cart-total">
            <h4>
              total <span>${total.toFixed(2)}</span>
            </h4>
          </div>
          <button
            className="btn clear-btn"
            onClick={() => dispatch(openModal())}
          >
            clear cart
          </button>
        </footer>
      </aside>
    </section>
  );
};

export default CartContainer;
