import React from "react";
import { useRef, useState } from "react";

function Footer({ setFilter }) {
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
          margin-left: 1em;
          color: #686868
        }
        .clicked {
          font-weight: 100;
          margin-left: 1em;
          color: #686868;
          padding: 3px;
          border: 2px solid #ebd8d8
        }
      `}</style>
      <div className="footer">
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
          ALL
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
          style={{ margin: "1em" }}
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
    </>
  );
}

export default Footer;
