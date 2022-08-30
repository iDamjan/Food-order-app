import React, { useContext } from "react";
import { useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Form.module.css";

export default function Form() {
  //CONTEXt
  const ctx = useContext(CartContext);

  const [name, setName] = useState("");
  const [nameIsTouched, setNameIsTouched] = useState(false);

  const nameIsValid = name.trim() != "";

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    console.log(nameIsValid);
  };

  const onBlurNameHandler = (e) => {
    setNameIsTouched(true);
  };

  const nameIsInvalid = !nameIsValid && nameIsTouched;
  

  const nameClasses = nameIsInvalid ? classes.invalid : classes.name;
  
  const submitFormHandler = async  (e) => {
    e.preventDefault();
    await fetch('https://food-app-d537e-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify(ctx.items),
    })

    ctx.resetItems(ctx.items)
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
      </div>

      {/* PASSWORD  */}
      <div className={classes.inputPass}>
        <label htmlFor="password">Enter password</label>
        <input type="password" id="password" placeholder="password123#" />
      </div>
      {/* PASSWORD  */}
      <button
        className={classes.buttonSubmit}
        disabled={nameIsInvalid}
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
    </form>
  );
}
