import { useState } from "react";
import "./App.css";
import Joke from "./components/Joke";

function App() {
  const initialJokes = [
    {
      id: 1,
      question: "Why did the developer go broke?",
      answer: "Because he used up all his cache!",
      votes: [
        { value: 10, label: "😂" },
        { value: 5, label: "👍" },
        { value: 3, label: "❤️" },
      ],
    },
    {
      id: 2,
      question: "How do you comfort a JavaScript bug?",
      answer: "You console it!",
      votes: [
        { value: 8, label: "😂" },
        { value: 4, label: "👍" },
        { value: 2, label: "❤️" },
      ],
    },
  ];

  const [jokeIndex, setJokeIndex] = useState(0);
  const [jokes, setJokes] = useState(initialJokes);

  const handleVote = (emoji: String) => {
    const updatedJokes = [...jokes];
    const joke = updatedJokes[jokeIndex];

    const vote = joke.votes.find((v) => v.label === emoji);
    if (vote) {
      vote.value += 1;
    }

    setJokes(updatedJokes);
  };

  const nextJoke = () => {
    setJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
  };

  return (
    <>
      <div className="header">Voting Game</div>
      <div className="card-question">
        <Joke {...jokes[jokeIndex]} onVote={handleVote} />
        <button
          onClick={nextJoke}
          className="card-button"
        >
          NEXT JOKE &#10140;
        </button>
      </div>
    </>
  );
}

export default App;
