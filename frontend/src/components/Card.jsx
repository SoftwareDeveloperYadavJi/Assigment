import React, { useState, useEffect } from "react";
import axios from "axios";
import './CardComponent.css'; // Import custom CSS for flip animation

const CardComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false); // Reset to show question
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false); // Reset to show question
    }
  };

  if (questions.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-100 px-4">
      <div
        onClick={handleCardClick}
        className={`card w-full max-w-md h-80 bg-white shadow-lg rounded-lg mb-4 cursor-pointer transform transition-transform duration-700 ${showAnswer ? 'flip' : ''}`}
      >
        <div className="card-inner">
          <div className="card-side card-front flex items-center justify-center p-4">
            <p className="text-lg font-semibold text-gray-900 text-center">{questions[currentIndex].question}</p>
          </div>
          <div className="card-side card-back flex items-center justify-center p-4">
            <p className="text-lg font-semibold text-gray-900 text-center">{questions[currentIndex].answer}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-md mt-4">
        <button
          onClick={handlePrev}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:bg-blue-700 ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:bg-blue-700 ${
            currentIndex === questions.length - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
