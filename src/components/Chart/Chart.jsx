import React, { useState, useEffect } from "react";
import { FetchDailyData } from "../../api";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = () => {
  const [updateDaily, setUpdateDaily] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setUpdateDaily(await FetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart = updateDaily.length ? (
    <Line
      data={{
        labels: updateDaily.map(({ date }) => date),
        datasets: [
          {
            data: updateDaily.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: updateDaily.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
