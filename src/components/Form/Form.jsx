import React, { useContext } from "react";
import { useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Form.module.css";

export default function Form() {
  //CONTEXt
  const ctx = useContext(CartContext);

  const [name, setName] = useState("");
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  // NAME VALIDATION
  let nameIsValid = name.trim() != "" && name.length > 4;

  //PASSWORD VALIDATION\
  const passwordIsValid = password.length > 6;

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onBlurNameHandler = (e) => {
    setNameIsTouched(true);
  };

  const onBlurPasswordHandler = (e) => {
    setPasswordIsTouched(true);
  };

  const nameIsInvalid = !nameIsValid && nameIsTouched;
  const passwordIsInvalid = !passwordIsValid && passwordIsTouched;
  const formIsValid = nameIsValid && passwordIsValid;

  const nameClasses = nameIsInvalid ? classes.invalid : classes.input;
  const passwordClasses = passwordIsInvalid ? classes.invalid : classes.input;

  const submitFormHandler = async (e) => {
    e.preventDefault();
    await fetch(
      "https://food-app-d537e-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(ctx.items),
      }
    );

    ctx.resetItems(ctx.items);
  };
  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      {/* NAME  */}
      <div className={nameClasses}>
        <label htmlFor="name">Enter your name</label>
        <input
          onChange={nameChangeHandler}
          onBlur={onBlurNameHandler}
          type="name"
          id="name"
          placeholder="User123"
        />
        {nameIsInvalid ? <p className={classes.text}>Enter a username with minimum 5 characters</p> : ''}
      </div>

      {/* PASSWORD  */}
      <div className={passwordClasses}>
        <label htmlFor="password">Enter password</label>
        <input
          type="password"
          id="password"
          placeholder="password123#"
          onChange={passwordChangeHandler}
          onBlur={onBlurPasswordHandler}
        />
        {passwordIsInvalid ? <p className={classes.text}>Enter a password longer than 6 characters</p> : ''}
      </div>
      {/* PASSWORD  */}
      <div>
        <button
          className={classes.buttonSubmit}
          disabled={!formIsValid}
          type="sumbit"
        >
          Submit
        </button>
        <button
          onClick={() => ctx.setOrder(false)}
          className={classes.buttonSubmit}
          type="click"
        >
          Back to Cart
        </button>
      </div>
    </form>
  );
}
