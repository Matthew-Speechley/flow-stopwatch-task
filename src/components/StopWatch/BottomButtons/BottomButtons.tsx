import React, { useState } from "react";
import MoonIcon from "../../../assets/MoonIcon";
import SunIcon from "../../../assets/SunIcon";
import SaveIcon from "../../../assets/SaveIcon";
import { saveLaps } from "../../../utils/saveLaps";
import { toggleTheme } from "../../../utils/theme";
import styles from "./BottomButtons.module.css";
import ChessIcon from "../../../assets/ChessIcon";
import StopwatchIcon from "../../../assets/StopwatchIcon";

const BottomButtons = React.memo(
  ({
    isSaveDisabled,
    laps,
    onChessModeToggle,
    isChessMode,
  }: {
    isSaveDisabled: boolean;
    laps: { id: number; time: number }[];
    onChessModeToggle: () => void;
    isChessMode: boolean;
  }) => {
    const [theme, setTheme] = useState(
      () => document.documentElement.dataset.theme || "light"
    );
    const ThemeIcon = theme === "dark" ? SunIcon : MoonIcon;

    return (
      <div className={styles.bottomButtonsContainer}>
        <button
          onClick={() => setTheme(toggleTheme())}
          className={styles.svgButton}
          title={theme === "dark" ? "Light Mode" : "Dark Mode"}
        >
          <ThemeIcon />
        </button>
        <button
          onClick={onChessModeToggle}
          className={styles.svgButton}
          title={isChessMode ? "Stopwatch Mode" : "Chess Mode"}
        >
          {isChessMode ? <StopwatchIcon /> : <ChessIcon />}
        </button>

        <button
          className={styles.svgButton}
          onClick={() => saveLaps(laps)}
          disabled={isSaveDisabled}
          title={isSaveDisabled ? "No laps to save" : "Save Laps"}
        >
          <SaveIcon disabled={isSaveDisabled} />
        </button>
      </div>
    );
  }
);

export default BottomButtons;
