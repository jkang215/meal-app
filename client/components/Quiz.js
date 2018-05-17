import React from 'react';

const Quiz = (props) => {
  const mealList = props.mealList;
  const tags = [];
  mealList.forEach((meal) => {
    tags.push(...meal.tags);
  });
  const tagList = Array.from(new Set(tags)); // Remove duplicates with set
  const tagElements = tagList.map(tag => (
    <div className="checkbox">
      <label>
        <input type="checkbox" name="tag" value={tag}></input> {tag}
      </label>
    </div>
  ));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-xs-8 col-centered">
          <h4>What are you feelin'?</h4>
          <p>Select some tags that match what you want to eat!</p>
          <form id="quiz-form">
            {tagElements}
            <button className="btn btn-primary" type='button' onClick={() => { props.showSuggestions() }}>Give me suggestions!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
