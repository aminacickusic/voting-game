import "./Joke.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

export type Vote = {
  value: number;
  label: string;
};

export type JokeProps = {
  question: string;
  answer: string;
  votes: Vote[];
  onVote: (emoji: string) => void;
};

function Joke({ question, answer, votes, onVote }: JokeProps) {
  return (
    <>
      <div className="joke-options">
        <FontAwesomeIcon icon={faPenToSquare} />
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
      <div className="joke-container">
        <h2 className="question-style">{question}</h2>
        <p className="answer-style">{answer}</p>

        <div className="emoji-container">
          {votes.map((vote) => (
            <button
              key={vote.label}
              className="button-blue"
              onClick={() => onVote(vote.label)}
            >
              {vote.label} ({vote.value})
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Joke;
