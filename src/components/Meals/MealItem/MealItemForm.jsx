import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import React, { useRef, useState } from "react";

const MealItemForm = (props) => {

  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 0 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    
    props.onAddToCart(enteredAmountNumber);

  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          min: "1",
          max: "5",
          step: "1",
          type: "number",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
