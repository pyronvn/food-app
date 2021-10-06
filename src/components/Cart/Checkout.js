import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef("");
  const streetInputRef = useRef("");
  const mobileInputRef = useRef("");

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    mobile: true,
  });

  const onCancelHandler = (event) => {
    event.preventDefault();
    props.onCancel();
  };
  const onConfirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredMobile = mobileInputRef.current.value;

    setFormInputsValidity({
      name: enteredName.trim() !== "",
      mobile: enteredStreet.trim() !== "",
      street: enteredMobile.trim() !== "",
    });

    const isFormValid =
      enteredName.trim() !== "" &&
      enteredStreet.trim() !== "" &&
      enteredMobile.trim() !== "";

    if (!isFormValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      mobile: enteredMobile,
      street: enteredStreet,
    });
  };
  return (
    <form className={classes.form} onSubmit={onConfirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        } `}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Invalid Name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.street ? "" : classes.invalid
        } `}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Invalid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.mobile ? "" : classes.invalid
        } `}
      >
        <label htmlFor="mobile">Mobile</label>
        <input type="text" id="monile" ref={mobileInputRef} />
        {!formInputsValidity.mobile && <p>Invalid Mobile</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancelHandler}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
