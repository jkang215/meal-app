import React from 'react';
import MealMenu from './MealMenu';
import Quiz from './Quiz';
import Suggestions from './Suggestions';

const mealList = (props) => {
  const mealList = props.mealList;
  if (props.mealMenu) {
    // render menu to create a meal
    return (
      <MealMenu addMeal={props.addMeal} />
    );
  }
  if (props.mealQuiz) {
    // Render quiz to show suggestions
    return (
      <Quiz mealList={mealList} showSuggestions={props.showSuggestions} />
    );
  }
  if (props.suggestions) {
    // Render list of suggestions
    return (
      <Suggestions mealList={mealList} sTags={props.sTags} showHome={props.showHome} />
    );
  }
  if (mealList) {
    const listElements = mealList.map((meal, i) => {
      const tags = meal.tags.join(', ');
      return (
        <li>{i + 1}. {meal.title} - <em>{meal.description}</em> - <em>tags: {tags}</em> </li>
      );
    });
    return (
      <div id="mealList">
        <h2>Welcome {props.firstName} {props.lastName}!</h2>
        <h3>Meal List</h3>
        <ul>
          {listElements}
        </ul>
        <div className="buttons">
          <button onClick={() => { props.showMealMenu(); }}>Add A Meal</button>
          <button onClick={() => { props.showQuiz(); }}>What should I eat?</button>
          <button onClick={() => { props.logout(); }} name="logout" id="logout-button" type="button">Logout</button>
        </div>
      </div>
    );
  }
  return (
    <div id="mealList">
      <h2>Welcome {props.firstName} {props.lastName}!</h2>
      <h3>Meal List</h3>
      <div className="buttons">
        <button onClick={() => { props.showMealMenu(); }}>Add A Meal</button>
        <button onClick={() => { props.logout(); }} name="logout" id="logout-button" type="button">Logout</button>
      </div>
    </div>
  );
};

export default mealList;
