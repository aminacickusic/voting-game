import "./Joke.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState, useRef } from "react";

type Vote = {
  label: string;
  value: number;
};

type JokeProps = {
  _id: string;
  question: string;
  answer: string;
  votes: Vote[];
  onVote: (emoji: string) => void;
  onUpdate: (updatedQuestion: string, updatedAnswer: string) => void;
  onDelete: () => void;
};

export default function Joke({
  _id,
  question,
  answer,
  votes,
  onVote,
  onUpdate,
  onDelete,
}: JokeProps) {
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleSave = () => {
    onUpdate(newQuestion, newAnswer);
    closeDialog();
  };

  return (
    <>
      <div className="joke-options">
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={openDialog}
          className="edit-icon"
        />
        <FontAwesomeIcon icon={faTrashCan} onClick={onDelete} />
      </div>

      <div className="joke-container">
        <h2 className="question-style">{question}</h2>
        <p className="answer-style">{answer}</p>
        <div className="emoji-container">
          {votes.map((vote) => (
            <button
              className="button-blue"
              key={vote.label}
              onClick={() => onVote(vote.label)}
            >
              {vote.label} {vote.value}
            </button>
          ))}
        </div>
      </div>

      <dialog className="mdl-dialog" ref={dialogRef}>
        <h4 className="mdl-dialog__title">Edit Joke</h4>
        <div className="mdl-dialog__content">
          <input
            type="text"
            className="mdl-textfield__input"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Edit question"
          />
          <input
            type="text"
            className="mdl-textfield__input"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Edit answer"
          />
        </div>
        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button" onClick={handleSave}>
            Save
          </button>
          <button
            type="button"
            className="mdl-button close"
            onClick={closeDialog}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
}
