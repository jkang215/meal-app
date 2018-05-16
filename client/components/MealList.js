import React from 'react';

const mealList = (props) => {
  const mealList = props.mealList;
  if (props.mealMenu) {
    // render menu to create a meal
    return (
      <form>
        <input id="mTitle-field" name="username" type="text" placeholder="Title"></input>
        <input id="mDescription-field" name="password" type="text" placeholder="Description"></input>
        <input id="mTags-field" name="firstName" type="text" placeholder="Tags (Separate with commas)"></input>
        <button type='button' onClick={() => {props.addMeal()}}>Add This Meal</button>
      </form>
    );
  }
  if (mealList) {
    const listElements = mealList.map((meal, i) => (
      <li>{i + 1}. {meal.title} - <em>{meal.description}</em> - <em>{meal.tags}</em> </li>
    ));
    return (
      <div id="mealList">
        <h1>Welcome {props.firstName} {props.lastName}!</h1>
        <h3>Meal List</h3>
        <ul>
          {listElements}
        </ul>
        <button onClick={() => { props.showMealMenu(); }}>Add A Meal</button>
        <button onClick={() => { props.logout(); }} name="logout" id="logout-button" type="button">Logout</button>
      </div>
    );
  }
  return (
    <div id="mealList">
      <h1>Welcome {props.firstName} {props.lastName}!</h1>
      <h3>Meal List</h3>
      <button onClick={() => { props.showMealMenu() }}>Add A Meal</button>
      <button onClick={() => { props.logout(); }} name="logout" id="logout-button" type="button">Logout</button>
    </div>
  );
};

export default mealList;
