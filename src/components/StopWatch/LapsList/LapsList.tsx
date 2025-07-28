import { motion, AnimatePresence } from "framer-motion";
import styles from "./LapsList.module.css";
import { formatTime } from "../../../utils/formatTime";

export default function LapsList({
  laps,
}: {
  laps: { id: number; time: number }[];
}) {
  return (
    <motion.ul className={styles.lapsList}>
      <AnimatePresence>
        {laps.map((lapTime, index) => (
          <motion.li
            key={lapTime.id}
            className={styles.lapListItem}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className={styles.lapNumber}>LAP {laps.length - index}</span>
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
  );
}
