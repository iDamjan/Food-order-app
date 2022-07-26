import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {

  return (

    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          min: "1",
          max: "5",
          step: "1",
          type: "number",
          defaultValue:"1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
