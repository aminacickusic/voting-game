import { useState, useEffect } from "react";
import "./App.css";
import Joke from "./components/Joke";

type Vote = {
  value: number;
  label: string;
};

type JokeData = {
  _id: string;
  question: string;
  answer: string;
  votes: Vote[];
};

function App() {
  const [joke, setJoke] = useState<JokeData | null>(null);

  const fetchJoke = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/joke");
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  const handleVote = async (emoji: string) => {
    if (!joke) return;

    try {
      const response = await fetch(
        `http://localhost:9000/api/joke/${joke._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emoji }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit vote");
      }

      const updatedJoke = await response.json();
      setJoke((prev) => (prev ? { ...prev, votes: updatedJoke.votes } : null));
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const handleUpdateJoke = async (
    updatedQuestion: string,
    updatedAnswer: string
  ) => {
    if (!joke) return;

    try {
      const response = await fetch(
        `http://localhost:9000/api/joke/${joke._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: updatedQuestion,
            answer: updatedAnswer,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update joke");
      }

      const updatedJoke = await response.json();
      setJoke(updatedJoke);
    } catch (error) {
      console.error("Error updating joke:", error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <>
      <div className="header">Voting Game</div>
      <div className="card-question">
        {joke ? (
          <Joke
            _id={joke._id}
            question={joke.question}
            answer={joke.answer}
            votes={joke.votes}
            onVote={handleVote}
            onUpdate={handleUpdateJoke}
          />
        ) : (
          <p>Loading joke...</p>
        )}
        <button onClick={fetchJoke} className="card-button">
          NEXT JOKE &#10140;
        </button>
      </div>
    </>
  );
}

export default App;
