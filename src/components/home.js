import Month from "./month.js";
import EditDay from "./editDay.js";
import Legend from "./legend";

import { useState, useEffect } from "react";

const Home = () => {
  const [year, setYear] = useState({});
  const [yearStats, setYearStats] = useState({
    best: 0,
    amazing: 0,
    average: 0,
    bad: 0,
    ratedDays: 0,
    ratingSum: 0,
  });
  const [editDay, setEditDay] = useState(null);

  useEffect(() => {
    const getYearInfo = async () => {
      const yearID = await fetch(`${process.env.REACT_APP_BACKEND_URL}/year/`);
      const jYearID = await yearID.json();
      const tempYear = await fetch(`${process.env.REACT_APP_BACKEND_URL}/year/${jYearID[0]._id}/`);
      const jTempYear = await tempYear.json();
      setYear(jTempYear);
    }
    getYearInfo();
  }, []);

  if (editDay) {
    return (
      <EditDay day={editDay} setEditDay={setEditDay}></EditDay>
    );
  }
  const yearDivStyle = {
    display: "flex",
    flexDirection: "column",
  }
  const yearHeaderStyle = {
    fontSize: "4rem",
    fontWeight: "bold",
    margin: "auto"
  }
  const statsDivStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottom: "1px solid black",
    paddingBottom: "1rem",
  }
  return (
    <div>
        {year[0] && 
          <div style={yearDivStyle}>
            <div style={yearHeaderStyle}>{year[0].year} </div> 
            <div style={statsDivStyle}> 
              <div>{yearStats.best} Best Day{yearStats.best > 1 ? "s" : ""} Ever</div>
              <div>{yearStats.amazing} Amazing Day{yearStats.amazing > 1 ? "s" : ""}</div>
              <div>{yearStats.average} Average Day{yearStats.average > 1 ? "s" : ""}</div>
              <div>{yearStats.bad} Bad Day{yearStats.bad > 1 ? "s" : ""}</div>
              <div> Average Day Rating: {yearStats.ratingSum/yearStats.ratedDays} </div>
            </div>
          </div>
          }
        <Legend></Legend>
        {year[0] && year[0].months.map((month, index) => {
          return (
            <Month key={index} month={month} setEditDay={setEditDay} yearStats={yearStats} setYearStats={setYearStats}></Month>
          );
        })}
    </div>
  )
}

export default Home;