import { useState } from "react";
import { useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {

    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-app-d537e-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();

      let loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          if: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals();
  });

  // MAP function for rendering the Meal list
  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      name={meal.name}
      key={meal.id}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
