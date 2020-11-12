import React from "react";
import { withRouter } from "react-router-dom";

import styles from "./Burger.module.css";
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  // Explaination Down
  let transofrmedIngredient = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  // console.log(transofrmedIngredient);

  if (transofrmedIngredient.length === 0) {
    transofrmedIngredient = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transofrmedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);

// transofrmedIngredient:

// 1. becouse I'm reaceving Object of ingredients in the state we need to change it to array to map through it, So here we use Object.keys which takes the keys of the array and change to array of strings of that keys ['meat','salad',...]

// 2.Then in each one of them we call it igKey we return [...Array()]which return the number of that specific key so as example we have 'salad':3 it will return array [ , , ] three elements in it so this method just retun as example salad : 3 it will give [undefined , undefined , undefined] does not mattar what is the value BIG NOTE here !! all the idea here how it return three elements like that check the Array constructor for single element Array(3) for example it will return Array(3) with the proporty of lenghth of it not the acctual array but with spread operator we are returning the actual array with three elements of undifined

// 3. then we map through that array [undefined , undefined , undefined] then we say map(_,i) this _ means nothing becouse we do not want that element but i it is the index of it then we return   <BurgerIngredient key={igKey + i} type={igKey} /> which means the key {'salad'+ 1} for example so it will give us unique key then the type which is salad and it will go through that array of ['salad' , 'salad' , 'salad'] and it will make as much as the number of it

// 4.reduce()

// what reduce in array does is  taking multiple array and reduce it to a single value , it takes two arrguments first function second one is the initial value as example reduce(()=> {} , [])  now the function takes two arrguments (arr , el ) arr which is [] the initial value which is empty and el is the current array that the reducer will loop throughout all of them

// .reduce((arr, el) => {
//   return arr.concat(el);
// }, []);

// So here we will return arr which is [] then we concat which concat do is add the arrays to each other in one array so each round it add array to make them single one

// So after doing that if we check   console.log(transofrmedIngredient);
// will find out that we make it single array [] and it is empty unless we add ingrendiant
