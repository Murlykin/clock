import React from "react";
import "./BreakLength.css";
import ChevronDown from "../Svgs/ChevronDown";
import ChevronUp from "../Svgs/ChevronUp";
import { ACTIONS } from "../../components/App/App";

const BreakLength = (props) => {
  return (
    <section id="break-label">
      <section id="session-label" className="break-length">
        <h2 className="break-length__title">
          Break
          <br />
          Length
        </h2>
        <div className="break-length__controls">
          <button
            id="break-decrement"
            className="break-length__decrement"
            onClick={() => {
              props.dispatch({
                type: ACTIONS.DEC_BREAK,
              });
            }}
          >
            <ChevronDown />
          </button>
          <div id="break-length" className="break-length__count">
            {props.breakLength}
          </div>
          <button
            id="break-increment"
            className="break-length__increment"
            onClick={() => {
              props.dispatch({
                type: ACTIONS.INC_BREAK,
              });
            }}
          >
            <ChevronUp />
          </button>
        </div>
      </section>
    </section>
  );
};

export default BreakLength;
