import React, { useState } from "react";
import MoonIcon from "../../../assets/MoonIcon";
import SunIcon from "../../../assets/SunIcon";
import SaveIcon from "../../../assets/SaveIcon";
import { saveLaps } from "../../../utils/saveLaps";
import { toggleTheme } from "../../../utils/theme";
import styles from "./BottomButtons.module.css";

const BottomButtons = React.memo(
  ({
    isSaveDisabled,
    laps,
  }: {
    isSaveDisabled: boolean;
    laps: { id: number; time: number }[];
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
        >
          <ThemeIcon />
        </button>
        <button className={styles.svgButton} onClick={() => saveLaps(laps)}>
          <SaveIcon disabled={isSaveDisabled} />
        </button>
      </div>
    );
  }
);

export default BottomButtons;
