import React from 'react';

const Suggestions = (props) => {
  const mealList = props.mealList;
  const tags = props.sTags;
  const matched = [];
  for (let i = 0; i < mealList.length; i += 1) {
    for (let j = 0 ; j < mealList[i].tags.length; j += 1) {
      if (tags.includes(mealList[i].tags[j])) {
        matched.push(mealList[i]);
        break;
      }
    }
  }
  const matchElements = matched.map((meal, i) => {
    const tags = meal.tags.join(', ');
    return (
      <li>{i + 1}. {meal.title} - <em>{meal.description}</em> - <em>tags: {tags}</em> </li>
    );
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-xs-8 col-centered">
          <h4>You should eat:</h4>
          <ul>
            {matchElements}
          </ul>
          <button type='button' onClick={() => { props.showHome() }}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
