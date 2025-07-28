import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../../utils/formatTime";
import styles from "./ChessTimers.module.css";
import SwitchIcon from "../../../assets/SwitchIcon";
import ChessButton from "../../../assets/ChessButton";

interface Props {
  isRunning: boolean;
  reset: boolean;
}

const ChessTimers = ({ isRunning, reset }: Props) => {
  const [isLeftTimerRunning, setIsLeftTimerRunning] = useState(true);
  const [leftAccumulated, setLeftAccumulated] = useState(0);
  const [rightAccumulated, setRightAccumulated] = useState(0);
  const [liveTime, setLiveTime] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (reset) {
      cancelAnimationFrame(animationRef.current ?? 0);
      startTimeRef.current = null;
      setLeftAccumulated(0);
      setRightAccumulated(0);
      setIsLeftTimerRunning(true);
      setLiveTime(0);
    }
  }, [reset]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      const update = () => {
        const now = Date.now();
        const delta = now - (startTimeRef.current ?? now);
        setLiveTime(delta);
        animationRef.current = requestAnimationFrame(update);
      };
      animationRef.current = requestAnimationFrame(update);
    } else {
      if (startTimeRef.current !== null) {
        const now = Date.now();
        const delta = now - startTimeRef.current;
        if (isLeftTimerRunning) {
          setLeftAccumulated((t) => t + delta);
        } else {
          setRightAccumulated((t) => t + delta);
        }
        startTimeRef.current = null;
      }
      cancelAnimationFrame(animationRef.current ?? 0);
      setLiveTime(0);
    }

    return () => cancelAnimationFrame(animationRef.current ?? 0);
  }, [isLeftTimerRunning, isRunning]);

  const switchSide = () => {
    if (!isRunning) return;

    const now = Date.now();
    const delta = now - (startTimeRef.current ?? now);
    if (isLeftTimerRunning) {
      setLeftAccumulated((t) => t + delta);
    } else {
      setRightAccumulated((t) => t + delta);
    }

    setIsLeftTimerRunning(!isLeftTimerRunning);
    setLiveTime(0);
    startTimeRef.current = Date.now();
  };

  const leftTime =
    isLeftTimerRunning && isRunning
      ? leftAccumulated + liveTime
      : leftAccumulated;

  const rightTime =
    !isLeftTimerRunning && isRunning
      ? rightAccumulated + liveTime
      : rightAccumulated;

  const { main: leftMain, fractional: leftFractional } = formatTime(leftTime);
  const { main: rightMain, fractional: rightFractional } =
    formatTime(rightTime);

  return (
    <div className={styles.chessTimers}>
      <time className={isLeftTimerRunning ? "" : styles.inActive}>
        {leftMain}
        <span className={styles.centiseconds}>{leftFractional}</span>
      </time>
      <button
        onClick={switchSide}
        disabled={!isRunning}
        className={styles.svgButton}
      >
        <SwitchIcon disabled={!isRunning} />
      </button>
      <time className={isLeftTimerRunning ? styles.inActive : ""}>
        {rightMain}
        <span className={styles.centiseconds}>{rightFractional}</span>
      </time>
      <div
        className={styles.chessButtonContainer}
        style={{
          rotate: isRunning ? (isLeftTimerRunning ? "-3deg" : "3deg") : "",
        }}
      >
        <ChessButton />
      </div>
    </div>
  );
};

export default ChessTimers;
