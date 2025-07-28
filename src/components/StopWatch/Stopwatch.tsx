import { useRef, useState } from "react";
import styles from "./Stopwatch.module.css";
import TimeDisplay from "./TimeDisplay/TimeDisplay";
import BottomButtons from "./BottomButtons/BottomButtons";
import LapsList from "./LapsList/LapsList";
import ChessTimers from "./ChessTimers/ChessTimers";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<{ id: number; time: number }[]>([]);
  const [isChessMode, setIsChessMode] = useState(false);
  const [shouldResetChessTimers, setShouldResetChessTimers] = useState(false);

  const startTimeRef = useRef<number | null>(null);

  const start = () => {
    startTimeRef.current = Date.now() - elapsedTime;
    setIsRunning(true);
    setShouldResetChessTimers(false);
  };

  const pause = () => {
    setIsRunning(false);
    if (startTimeRef.current !== null) {
      setElapsedTime(Date.now() - startTimeRef.current);
    }
  };

  const reset = () => {
    pause();
    setElapsedTime(0);
    setLaps([]);
    startTimeRef.current = null;
    setShouldResetChessTimers(true);
  };

  const lap = () => {
    const currentTime = isRunning
      ? Date.now() - (startTimeRef.current ?? 0)
      : elapsedTime;
    const id = Date.now();
    setLaps((prevLaps) => [{ id, time: currentTime }, ...prevLaps]);
  };

  const toggleChessMode = () => {
    if (isRunning || elapsedTime > 0) {
      if (
        !window.confirm(
          "This action will reset your stopwatch. Do you want to continue?"
        )
      ) {
        return;
      }
    }
    setIsChessMode(!isChessMode);
    reset();
  };

  return (
    <div className={styles.stopwatch}>
      <div className={styles.buttons}>
        <button onClick={start} disabled={isRunning}>
          start
        </button>
        <button onClick={pause} disabled={!isRunning}>
          pause
        </button>
        {isChessMode ? null : (
          <button onClick={lap} disabled={elapsedTime === 0 && !isRunning}>
            lap
          </button>
        )}
        <button onClick={reset} disabled={elapsedTime === 0 && !isRunning}>
          reset
        </button>
      </div>
      <TimeDisplay isRunning={isRunning} initialElapsed={elapsedTime} />

      {isChessMode ? (
        <ChessTimers isRunning={isRunning} reset={shouldResetChessTimers} />
      ) : laps.length === 0 ? null : (
        <LapsList laps={laps} />
      )}

      <BottomButtons
        isSaveDisabled={laps.length === 0}
        laps={laps}
        onChessModeToggle={toggleChessMode}
        isChessMode={isChessMode}
      />
    </div>
  );
};

export default Stopwatch;
