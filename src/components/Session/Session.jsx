import React from "react";
import "./Session.css";
import PlayPause from "../Svgs/PlayPause";
import Reset from "../Svgs/Reset";
import { ACTIONS } from "../../components/App/App";

const Session = (props) => {
  function formatTime(number) {
    let minutes = Math.floor(number / 60);
    let seconds = number - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
  }

  return (
    <section id="timer-label" className="session">
      <div className="session__container">
        <div className="session__controls">
          <button
            id="start_stop"
            className="session__play-pause"
            onClick={() => {
              return props.dispatch({
                type: ACTIONS.PAUSED,
              });
            }}
          >
            <PlayPause />
          </button>
          <button
            id="reset"
            className="session__reset"
            onClick={props.handleReset}
          >
            <Reset />
          </button>
        </div>
        <div>
          <h2 className="session__title">
            {props.sessionOn ? "Session" : "Break"}
          </h2>
          <div id="time-left" className="session__time-left">
            {formatTime(props.timeLeft)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Session;
