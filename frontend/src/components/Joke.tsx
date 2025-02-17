import "./Joke.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";


type Vote = {
  label: string;
  value: number;
};

type JokeProps = {
  question: string;
  answer: string;
  votes: Vote[];
  onVote: (emoji: string) => void;
};

export default function Joke({ question, answer, votes, onVote }: JokeProps) {
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
          <button className="button-blue" key={vote.label} onClick={() => onVote(vote.label)}>
            {vote.label} {vote.value}
          </button>
        ))}
      </div>
    </div>
    </>
  );
}
