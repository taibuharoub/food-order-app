import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

// helper functions
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  // will use combined state
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // validate inputs
    const enterNameIsValid = !isEmpty(enteredName);
    const enterStreetIsValid = !isEmpty(enteredStreet);
    const enterCityIsValid = !isEmpty(enteredCity);
    const enterPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValidity({
      name: enterNameIsValid,
      street: enterStreetIsValid,
      city: enterCityIsValid,
      postalCode: enterPostalCodeIsValid,
    });

    const formIsValid =
      enterNameIsValid &&
      enterStreetIsValid &&
      enterCityIsValid &&
      enterPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    // submit cart data to server
    console.group("User data");
    console.log({ enteredName });
    console.log({ enteredStreet });
    console.log({ enteredPostalCode });
    console.log({ enteredCity });
    console.groupEnd("User data");

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        {/* this will be of type button so that it can't submit the form */}
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
