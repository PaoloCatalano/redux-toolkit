import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

import { calculateTotals } from "./feature/cart/cartSlice";

function App() {
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    //eslint-disable-next-line
  }, [cartItems]);

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />

      <Home />
    </main>
  );
}
export default App;
