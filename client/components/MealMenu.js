import React from 'react';

const MealMenu = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-xs-8 col-centered">
          <form id="meal-form">
            <input id="mTitle-field" name="username" type="text" placeholder="Title"></input>
            <input id="mDescription-field" name="password" type="text" placeholder="Description"></input>
            <input id="mTags-field" name="firstName" type="text" placeholder="Tags (Separated with commas)"></input>
            <button type='button' onClick={() => { props.addMeal() }}>Add This Meal</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealMenu;
