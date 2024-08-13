export const fetchQuestions = async () => {
    const response = await fetch("http://localhost:3000/questions");
    return await response.json();
  };
  
  export const addQuestion = async (questionData) => {
    await fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    });
  };
  
  export const deleteQuestion = async (index) => {
    await fetch(`http://localhost:3000/questions/${index}`, {
      method: "DELETE",
    });
  };
  