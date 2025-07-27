import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Stopwatch.module.css";
import { formatTime } from "../../utils/formatTime";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<{ id: number; time: number }[]>([]);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const { main, fractional } = formatTime(elapsedTime);

  const updateElapsed = () => {
    if (startTimeRef.current !== null) {
      setElapsedTime(Date.now() - startTimeRef.current);
      animationFrameRef.current = requestAnimationFrame(updateElapsed);
    }
  };

  const start = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      setIsRunning(true);
      animationFrameRef.current = requestAnimationFrame(updateElapsed);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  const reset = () => {
    stop();
    setElapsedTime(0);
    setLaps([]);
    startTimeRef.current = null;
  };

  const lap = () => {
    if (elapsedTime > 0) {
      const id = Date.now() + Math.random();
      setLaps((prevLaps) => [{ id, time: elapsedTime }, ...prevLaps]);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className={styles.stopwatch}>
      <div className={styles.buttons}>
        <button onClick={start} disabled={isRunning}>
          start
        </button>
        <button onClick={stop} disabled={!isRunning}>
          pause
        </button>
        <button onClick={lap} disabled={elapsedTime === 0}>
          lap
        </button>
        <button onClick={reset} disabled={elapsedTime === 0}>
          reset
        </button>
      </div>

      <h1 className={styles.time}>
        <time>
          {main}
          <span className={styles.centiseconds}>{fractional}</span>
        </time>
      </h1>
      <div className={styles.topGradient} />
      <motion.ul className={styles.lapsList}>
        <AnimatePresence>
          {laps.map((lapTime, index) => (
            <motion.li
              key={lapTime.id}
              className={styles.lapListItem}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className={styles.lapNumber}>
                LAP {laps.length - index}
              </span>
              {(() => {
                const { main, fractional } = formatTime(lapTime.time);
                return (
                  <time className={styles.lapTime}>
                    {main}
                    <span className={styles.centiseconds}>{fractional}</span>
                  </time>
                );
              })()}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <div className={styles.bottomGradient} />
    </div>
  );
};

export default Stopwatch;
