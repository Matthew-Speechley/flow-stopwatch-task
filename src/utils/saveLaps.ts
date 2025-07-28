import { formatTime } from "./formatTime";

export const saveLaps = (laps: { id: number; time: number }[]) => {
  if (laps.length === 0) return;

  const csvRows = [...laps].reverse().map((lap, index) => {
    const lapNumber = index + 1;
    const { main, fractional } = formatTime(lap.time);
    return `${lapNumber},${main}${fractional}`;
  });

  csvRows.unshift("Lap,Time");
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "laps.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
