import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedQuestions = questions.filter(
            (question) => question.id !== id
          );
          setQuestions(updatedQuestions);
        } else {
          console.error("Failed to delete question from the server");
        }
      })
      .catch((error) => {
        console.error("Error while deleting question:", error);
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onQuestionSubmit={addQuestion} />
      ) : (
        <QuestionList questions={questions} onDelete={deleteQuestion} />
      )}
    </main>
  );
}

export default App;
