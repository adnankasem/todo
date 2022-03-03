import React from "react";
import { useRef, useState } from "react";

function Footer({ setFilter, todos, itemsLeft, clearTodos, allAreInComplete }) {
  let allRef = useRef();
  let activeRef = useRef();
  let completedRef = useRef();

  const [all, setAll] = useState("notClicked");
  const [active, setActive] = useState("notClicked");
  const [completed, setCompleted] = useState("notClicked");

  return (
    <>
      <style>{`
        .notClicked {
          font-weight: 100;
          font-size: 15px;
          margin-left: 1em;
          color: #686868;
          cursor: pointer
        }
        .clicked {
          font-weight: 100;
          font-size: 15px;
          margin-left: 1em;
          color: #686868;
          padding: 5px;
          border: 1px solid #ebd8d8;
          cursor: pointer
        }
      `}</style>
      <div className="footer">
        <div className="items-left">
          <p>{`${itemsLeft} items left`}</p>
        </div>
        <div className="filter">
          <p
            className={all}
            ref={allRef}
            onClick={() => {
              setFilter("ALL");
              setAll("clicked");
              setActive("notClicked");
              setCompleted("notClicked");
              console.log(allRef);
              // allRef.current.style.color = "#ebd8d8";
              // activeRef.current.style.color = "#686868";
              // completedRef.current.style.color = "#686868";
            }}
          >
            All
          </p>
          <p
            className={active}
            ref={activeRef}
            onClick={() => {
              setFilter("ACTIVE");
              setAll("notClicked");
              setActive("clicked");
              setCompleted("notClicked");
              // allRef.current.style.color = "#686868";
              // activeRef.current.style.color = "#ebd8d8";
              // completedRef.current.style.color = "#686868";
            }}
          >
            Active
          </p>
          <p
            className={completed}
            ref={completedRef}
            onClick={() => {
              setFilter("COMPLETED");
              setAll("notClicked");
              setActive("notClicked");
              setCompleted("clicked");
              // allRef.current.style.color = "#686868";
              // activeRef.current.style.color = "#686868";
              // completedRef.current.style.color = "#ebd8d8";
            }}
          >
            Completed
          </p>
        </div>
        <div className="clear-completed">
          <p onClick={() => clearTodos()}>
            {!allAreInComplete && "Clear Completed"}
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
