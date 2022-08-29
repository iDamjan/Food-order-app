import React from "react";
import classes from './Form.module.css'

export default function Form() {

    const submitFormHandler = (e) => {
        e.preventDefault();
    }
  return (
    <form onSubmit = {submitFormHandler} className={classes.form}>
      <input type="name" id="name" placeholder="your name" />
      <input type="password" id="password" placeholder="your passwrod" />
      <button type="sumbit">Submit</button>
    </form>
  );
}
