import React from "react";
import "./SessionLength.css";
import ChevronUp from "../Svgs/ChevronUp";
import ChevronDown from "../Svgs/ChevronDown";
import { ACTIONS } from "../../components/App/App";

const SessionLength = (props) => {
  return (
    <section id="session-label" className="session-length">
      <h2 className="session-length__title">
        Session
        <br />
        Length
      </h2>
      <div className="session-length__controls">
        <button
          id="session-decrement"
          className="session-length__decrement"
          onClick={() => {
            props.dispatch({
              type: ACTIONS.DEC_SESSION,
            });
          }}
        >
          <ChevronDown />
        </button>
        <div id="session-length" className="session-length__count">
          {props.sessionLength}
        </div>
        <button
          id="session-increment"
          className="session-length__increment"
          onClick={() => {
            props.dispatch({
              type: ACTIONS.INC_SESSION,
            });
          }}
        >
          <ChevronUp />
        </button>
      </div>
    </section>
  );
};

export default SessionLength;
