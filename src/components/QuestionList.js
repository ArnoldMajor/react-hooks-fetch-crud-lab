import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => { setQuestions(data) })
  }, [])

  function onDeleteItem(id) {
    setQuestions(questions.filter(question => question.id !== id))
  }

  function onChangeAnswer(id, newCorrectIndex) {
    setQuestions(questions.map(question => question.id === id ? { ...question, "correctIndex": newCorrectIndex } : question))
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem key={question.id} question={question} onDeleteItem={onDeleteItem} onChangeAnswer={onChangeAnswer} />)}</ul>
    </section>
  );
}

export default QuestionList;
