import React, { useContext } from "react";
import { useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Form.module.css";

export default function Form() {
  const ctx = useContext(CartContext);

  const [name, setName] = useState("");
  const [formError, setFormError] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [password, setPassword] = useState("");

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

  function isValidHandler() {
    const nameIsValid = name.trim() !== "" && name.length > 4;
    const passwordIsValid = password.length > 6;
    const error = {
      ...(!nameIsValid &&
        formTouched.name && {
          name: "Enter a username with minimum 5 characters",
        }),
      ...(!passwordIsValid &&
        formTouched.password && {
          password: "Enter a password longer than 6 characters",
        }),
    };

    setFormError(error);
  }

  const isFormValid = () => {
    return Object.keys(formError).length === 0;
  };

  const setFormName = (e) => {
    setName(e.target.value);
    isValidHandler();
  };

  const setFormPassword = (e) => {
    setPassword(e.target.value);
    isValidHandler();
  };

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <div className={formError.name ? classes.invalid : classes.input}>
        <label htmlFor="name">Enter your name</label>
        <input
          onChange={setFormName}
          onBlur={() => {
            Object.assign(formTouched, { name: true });
            setFormTouched(formTouched);
            isValidHandler();
          }}
          type="name"
          id="name"
          placeholder="User123"
        />
        {formError.name ? <p className={classes.text}>{formError.name}</p> : ""}
      </div>

      <div className={formError.password ? classes.invalid : classes.input}>
        <label htmlFor="password">Enter password</label>
        <input
          type="password"
          id="password"
          placeholder="password123#"
          onChange={setFormPassword}
          onBlur={() => {
            Object.assign(formTouched, { password: true });
            setFormTouched(formTouched);
            isValidHandler();
          }}
        />
        {formError.password ? (
          <p className={classes.text}>{formError.password}</p>
        ) : (
          ""
        )}
      </div>

      <div>
        <button
          className={classes.buttonSubmit}
          disabled={!isFormValid()}
          type="sumbit"
        >
          Submit
        </button>
        <button
          onClick={() => ctx.setIsOrdered(false)}
          className={classes.buttonSubmit}
          type="click"
        >
          Back to Cart
        </button>
      </div>
    </form>
  );
}
