import React from "react";

function QuestionItem({ question, onDeleteItem, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteItem(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => onDeleteItem(id))
  }

  function handleUpdateItem(id, newCorrectIndex) {
    console.log(newCorrectIndex)
    fetch(`http://localhost:4000/questions/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "correctIndex": newCorrectIndex
        })
      }
    ).then(res => res.json())
      .then(data => onChangeAnswer(id, newCorrectIndex))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(event) => handleUpdateItem(id, event.target.value)}>{options}</select>
      </label>
      <button onClick={() => handleDeleteItem(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
