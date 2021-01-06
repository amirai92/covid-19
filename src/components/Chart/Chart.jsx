import React, { useState, useEffect } from "react";
import { FetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({
  data: { confirmed, recovered, deaths, lastUpdate },
  country,
}) => {
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
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "Amount Of People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { diplay: false },
        title: { display: true, text: `Current status in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
