import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function Input({ addInput, input, setInput, completeAll }) {
  const callAddInput = (e) => {
    if (e.key === "Enter") {
      addInput(input);
      setInput("");
    }
  };
  return (
    <div className="main-input">
      <div className="complete-All">
        <p
          onClick={() => {
            completeAll();
          }}
        >
          <MdKeyboardArrowDown />
        </p>
      </div>
      <input
        value={input}
        placeholder="What needs to be done?"
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={callAddInput}
      />
    </div>
  );
}

export default Input;
