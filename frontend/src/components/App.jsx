import React, { useState, useEffect } from "react";
import Card from "./Card";
import Navigation from "./Navigation";
import AdminPanel from "./AdminPanel";
import { fetchQuestions } from "../services/api";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
    };

    getQuestions();
  }, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!questions.length) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <Card
        question={questions[currentIndex].question}
        answer={questions[currentIndex].answer}
      />
      <Navigation
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={currentIndex === 0}
        disableNext={currentIndex === questions.length - 1}
      />
      <AdminPanel />
    </div>
  );
};

export default App;
