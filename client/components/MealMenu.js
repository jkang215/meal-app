import React from 'react';

const MealMenu = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-xs-8 col-centered">
          <h4>Create a new meal</h4>
          <p>Add your meal here. Be sure to add descriptive tags!</p>
          <form id="meal-form">
            <div className="form-group">
              <label htmlFor="mTitle-field">Title</label>
              <input id="mTitle-field" className="form-control" name="username" type="text" placeholder="Title"></input>
            </div>
            <div className="form-group">
              <label htmlFor="mDescription-field">Description</label>
              <input id="mDescription-field" className="form-control" name="username" type="text" placeholder="Description"></input>
            </div>
            <div className="form-group">
              <label htmlFor="mTags-field">Tags</label>
              <input id="mTags-field" className="form-control" name="username" type="text" placeholder="Tags (Separated with commas)"></input>
            </div>
            <button className="btn btn-primary" type='button' onClick={() => { props.addMeal() }}>Add This Meal</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealMenu;
