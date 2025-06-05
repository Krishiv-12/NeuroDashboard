import { useEffect, useState } from "react";

export const usePomodoroAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pomodoro_logs")) || [];
    const grouped = {};

    stored.forEach((log) => {
      const day = new Date(log.timestamp).toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (!grouped[day]) {
        grouped[day] = { sessions: 0, minutes: 0 };
      }

      grouped[day].sessions += 1;
      grouped[day].minutes += log.minutes;
    });

    const finalData = Object.keys(grouped).map((day) => ({
      date: day,
      ...grouped[day],
    }));

    setData(finalData);
  }, []);

  return data;
};
