import React from 'react';

const Suggestions = (props) => {
  let mealList = props.mealList;
  const tags = props.sTags;
  // Initiate an array of scores for every meal
  const scores = new Array(mealList.length).fill(0);

  mealList.forEach((meal) => {
    meal.score = 0;
  });

  // Collect scores of every meal to see how many tags matched
  for (let i = 0; i < mealList.length; i += 1) {
    for (let j = 0 ; j < mealList[i].tags.length; j += 1) {
      if (tags.includes(mealList[i].tags[j])) {
        mealList[i].score += 1;
      }
    }
  }
  // Remove non-matches
  const matched = mealList.filter(meal => meal.score > 0);
  // Sort in descending order
  matched.sort((a,b) => b.score - a.score)

  const matchElements = matched.map((meal, i) => {
    const tags = meal.tags.join(', ');
    if (i === 0) { // Top match
      return (
        <tr key={i} className="success">
          <td>{meal.title}</td>
          <td>{meal.description}</td>
          <td>{tags}</td>
          <td>{meal.score}</td>
        </tr>
      );
    }
    return (
      <tr key={i}>
        <td>{meal.title}</td>
        <td>{meal.description}</td>
        <td>{tags}</td>
        <td>{meal.score}</td>
      </tr>
    );
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-xs-8 col-centered">
          <h4>You should eat:</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Meal</th>
                <th>Description</th>
                <th>Tags</th>
                <th>Hunger Score</th>
              </tr>
            </thead>
            <tbody>
              {matchElements}
            </tbody>
          </table>
          <button className="btn btn-primary" type='button' onClick={() => { props.showHome() }}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
