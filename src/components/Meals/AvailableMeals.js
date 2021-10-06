import { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
// import { DUMMY_MEALS } from "./dummy-meals";
import MealItem from "./MealItem/MealItem";

let mealsList = [];
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://react-food-app-dab37-default-rtdb.asia-southeast1.firebasedatabase.app/meal.json"
    );

    if (!response.ok) {
      setIsLoading(false);

      throw new Error("Something went wrong!!");
    }
    const data = await response.json();

    const loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler().catch((err) => {
      setIsLoading(false);
      setError(err);
    });
  }, [fetchMealsHandler]);

  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading...</section>;
  }

  if (error) {
    return <section className={classes.Error}>Error...</section>;
  }

  mealsList = meals.map((meal, index) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
