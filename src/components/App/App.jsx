import "./App.css";
import BreakLength from "../../components/BreakLength/BreakLength";
import SessionLength from "../../components/SessionLength/SessionLength";
import Session from "../../components/Session/Session";
import sound from "../../assets/public_sound_Tada-sound.mp3";
import { useReducer, useRef, useEffect } from "react";

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 1500,
  timerPaused: true,
  sessionOn: true,
};

export const ACTIONS = {
  INC_BREAK: "increment break",
  DEC_BREAK: "decrement break",
  INC_SESSION: "increment session",
  DEC_SESSION: "decrement session",
  PAUSED: "timer paused",
  COUNTDOWN: "countdown",
  SET_TIME_LEFT: "set new time left",
  RESET: "reset",
};

const reducer = (state, { type }) => {
  switch (type) {
    case ACTIONS.INC_BREAK:
      if (state.breakLength === 60) {
        return state;
      }
      return {
        ...state,
        breakLength: increment(state.breakLength),
      };

    case ACTIONS.DEC_BREAK:
      if (state.breakLength === 1) {
        return state;
      }
      return {
        ...state,
        breakLength: decrement(state.breakLength),
      };

    case ACTIONS.INC_SESSION:
      if (state.sessionLength === 60) {
        return state;
      }
      return {
        ...state,
        sessionLength: increment(state.sessionLength),
      };

    case ACTIONS.DEC_SESSION:
      if (state.sessionLength === 1) {
        return state;
      }
      return {
        ...state,
        sessionLength: decrement(state.sessionLength),
      };

    case ACTIONS.PAUSED:
      if (state.timerPaused === false) {
        return {
          ...state,
          timerPaused: true,
        };
      }
      if (state.timerPaused === true) {
        return {
          ...state,
          timerPaused: false,
        };
      }

    case ACTIONS.COUNTDOWN:
      if (state.timeLeft === 0) {
        return {
          ...state,
          timeLeft: state.sessionOn
            ? state.breakLength * 60
            : state.sessionLength * 60,
          sessionOn: !state.sessionOn,
        };
      }
      return {
        ...state,
        timeLeft: decrement(state.timeLeft),
      };

    case ACTIONS.SET_TIME_LEFT:
      return {
        ...state,
        timeLeft: state.sessionLength * 60,
      };

    case ACTIONS.RESET:
      return {
        ...state,
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 1500,
        timerPaused: true,
        sessionOn: true,
      };

    default:
      throw Error();
  }
};

function increment(number) {
  return number + 1;
}

function decrement(number) {
  return number - 1;
}

function App() {
  const playBeep = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let intervalId;
    if (state.timerPaused === true) {
      clearInterval(intervalId);
      return;
    }
    if (state.timerPaused === false) {
      intervalId = setInterval(() => {
        return dispatch({
          type: ACTIONS.COUNTDOWN,
        });
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [state.timerPaused]);

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_TIME_LEFT,
    });
  }, [state.sessionLength]);

  useEffect(() => {
    if (state.timeLeft === 0 && playBeep.current) {
      playBeep.current.play();
    }
  }, [state.timeLeft]);

  const handleReset = () => {
    if (playBeep.current) {
      playBeep.current.pause();
      playBeep.current.currentTime = 0;
    }
    dispatch({ type: ACTIONS.RESET });
  };

  return (
    <div className="App">
      <main className="main">
        <h1 className="title">25 + 5 Clock</h1>
        <div className="clock-container">
          <div className="length-container">
            <BreakLength breakLength={state.breakLength} dispatch={dispatch} />
            <SessionLength
              sessionLength={state.sessionLength}
              dispatch={dispatch}
            />
          </div>
          <Session
            sessionLength={state.sessionLength}
            dispatch={dispatch}
            sessionOn={state.sessionOn}
            breakLength={state.breakLength}
            timeLeft={state.timeLeft}
            timerPaused={state.timerPaused}
            handleReset={handleReset}
          />
        </div>
      </main>
      <audio id="beep" preload="auto" ref={playBeep} src={sound} />
    </div>
  );
}

export default App;
