import React from 'react';
import MealMenu from './MealMenu';
import Quiz from './Quiz';
import Suggestions from './Suggestions';

const mealList = (props) => {
  const mealList = props.mealList;
  if (props.mealMenu) {
    // render menu to create a meal
    return (
      <MealMenu addMeal={props.addMeal} showHome={props.showHome} />
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
        <tr key={i}>
          <td>{meal.title}</td>
          <td>{meal.description}</td>
          <td>{tags}</td>
        </tr>
      );
    });
    return (
      <div id="mealList">
        <h2>Welcome {props.firstName} {props.lastName}!</h2>
        <h3>Meal List</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Description</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {listElements}
          </tbody>
        </table>
        <div className="buttons">
          <button className="btn btn-primary" onClick={() => { props.showMealMenu(); }}>Add A Meal</button>
          <button className="btn btn-primary" onClick={() => { props.showQuiz(); }}>What should I eat?</button>
          <button className="btn btn-default" onClick={() => { props.logout(); }} name="logout" id="logout-button" type="button">Logout</button>
        </div>
      </div>
    );
  }
  return (
    <div id="mealList">
      <h2>Welcome {props.firstName} {props.lastName}!</h2>
      <h3>Meal List</h3>
      <div className="buttons">
        <button className="btn btn-primary" onClick={() => { props.showMealMenu(); }}>Add A Meal</button>
        <button className="btn btn-default" onClick={() => { props.logout(); }} name="logout" id="logout-button" type="button">Logout</button>
      </div>
    </div>
  );
};

export default mealList;
