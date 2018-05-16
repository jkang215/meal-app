import React from 'react';

const mealList = (props) => {
  const mealList = props.mealList;
  if (mealList) {
    const listElements = mealList.map(meal => (
      <li>{meal.title}</li>
    ));
    return (
      <div id="mealList">
        <h3>Meal List</h3>
        <ul>
          {listElements}
        </ul>
        <button onClick={() => { props.addMeal() }}>Add A Meal</button>
        <button name="logout" id="logout-button" type="button"><a href="http://localhost:3000/logout">Logout</a></button>
      </div>
    );
  }
  return (
    <div id="mealList">
      <h3>Meal List</h3>
      <button onClick={() => { props.addMeal() }}>Add A Meal</button>
    </div>
  );
};

export default mealList;
