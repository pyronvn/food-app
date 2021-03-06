import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `₹ ${Math.max(cartContext.totalAmount, 0).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userdata) => {
    setSubmitInProgress(true);
    const response = await fetch(
      "https://react-food-app-dab37-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userdata,
          orderedItems: cartContext.items,
        }),
      }
    );
    // Do error handling
    console.log(response);
    setDidSubmit(true);
    setSubmitInProgress(false);
    cartContext.removeAll();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
        // <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const cartModalContent = (
    <>
      {cartItems}
      {!hasItems && "No items in cart"}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!showCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const submittingModalContent = <>Creating Order...</>;

  const submitSuccess = (
    <>
      <p> Created order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!submitInProgress && !didSubmit && cartModalContent}
      {submitInProgress && submittingModalContent}
      {!submitInProgress && didSubmit && submitSuccess}
    </Modal>
  );
};

export default Cart;
