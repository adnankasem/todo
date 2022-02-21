import React from "react";

function Input({ addInput, input, setInput }) {
  const callAddInput = (e) => {
    if (e.key === "Enter") {
      addInput(input);
      setInput("");
    }
  };
  return (
    <div className="main-input">
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
