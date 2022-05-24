import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, increase, decrease } from "../feature/cart/cartSlice";
import { ChevronDown, ChevronUp } from "../icons";

const CartItem = ({ _id, image, name, price, inventory }) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={image} alt={name} />
      <div>
        <h4>{name}</h4>
        <h4 className="item-price">${price}</h4>
        <div className="amount-buttons">
          {/* decrease amount */}
          <button
            className="amount-btn"
            onClick={() => {
              if (inventory === 1) {
                dispatch(removeItem(_id));
                return;
              }
              dispatch(decrease({ _id }));
            }}
          >
            <ChevronDown />
          </button>
          {/* amount */}
          <div className="amount">{inventory}</div>
          {/* increase amount */}
          <button
            className="amount-btn"
            onClick={() => dispatch(increase({ _id }))}
          >
            <ChevronUp />
          </button>
        </div>
        {/* remove button */}
        <button
          className="remove-btn"
          onClick={() => dispatch(removeItem(_id))}
        >
          remove
        </button>
      </div>
    </article>
  );
};

export default CartItem;
