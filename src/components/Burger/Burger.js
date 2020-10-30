import React from "react";

import styles from "./Burger.module.css";
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="salad" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bacon" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
