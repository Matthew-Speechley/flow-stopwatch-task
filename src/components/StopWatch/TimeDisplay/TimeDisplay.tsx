import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../../utils/formatTime";
import styles from "./TimeDisplay.module.css";

interface Props {
  isRunning: boolean;
  initialElapsed: number;
}

const TimeDisplay = ({ isRunning, initialElapsed }: Props) => {
  const [localElapsed, setLocalElapsed] = useState(initialElapsed);
  const animationRef = useRef<number>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - initialElapsed;

      const update = () => {
        setLocalElapsed(Date.now() - (startTimeRef.current ?? 0));
        animationRef.current = requestAnimationFrame(update);
      };

      animationRef.current = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationRef.current ?? 0);
      setLocalElapsed(initialElapsed);
    }

    return () => {
      cancelAnimationFrame(animationRef.current ?? 0);
    };
  }, [isRunning, initialElapsed]);

  const { main, fractional } = formatTime(localElapsed);

  return (
    <h1>
      <time>
        {main}
        <span className={styles.centiseconds}>{fractional}</span>
      </time>
    </h1>
  );
};

export default TimeDisplay;
