import Day from "./day.js";
import { useState, useEffect } from "react";

const Month = (props) => {
  const [days, setDays] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    getStats();
    addBlankDays();
  }, []);

  const getStats = () => {
    let tempStats = {
      best: 0,
      amazing: 0,
      average: 0,
      bad: 0,
      averageRating: 0,
    };
    let tempYearStats = props.yearStats;
    let ratingSum = 0;
    let ratedDays = 0;
    props.month.days.forEach(day => {
      switch(day.feeling) {
        case("Best Day Ever"):
          tempStats.best++;
          tempYearStats.best++;
          break;
        case("Amazing"):
          tempStats.amazing++;
          tempYearStats.amazing++;
          break;
        case("Average"):
          tempStats.average++;
          tempYearStats.average++;
          break;
        case("Bad"):
          tempStats.bad++;
          tempYearStats.bad++;
          break;
        default: 
          break;
      }
      if (day.rating > 0) {
        ratingSum += day.rating;
        ratedDays++;
        tempYearStats.ratingSum += day.rating;
        tempYearStats.ratedDays++;
      }
    });
    tempStats.averageRating = ratingSum/ratedDays;
    setStats({...tempStats});
    props.setYearStats({...tempYearStats});
  }

  const addBlankDays = () => {
    const firstDate = new Date(props.month.days[0].date).getDay();
    let tempDays = props.month.days;
    for (let i = 0; i < firstDate; i++) {
      let tempDay = { blank: true };
      tempDays = [tempDay, ...tempDays]
    }
    setDays(tempDays);
  }
  const outerDivStyle = {
    borderBottom: "1px solid black",
    padding: "1rem"
  }
  const gridDiv = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
  }
  const monthNameStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
  }
  const statsDivStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "1rem",
  }
  const dayNameStyle = {
    margin: "1rem",
    fontSize: "1.5rem"
  }

  return (
    <div style={outerDivStyle}>
        <div style={monthNameStyle}>{props.month.name}</div>
        <div style={statsDivStyle}>
          {stats.best > 0 ? <div>{stats.best} Best Day{stats.best > 1 ? "s" : ""} Ever</div> : <div></div>}
          {stats.amazing > 0 ? <div>{stats.amazing} Amazing Day{stats.amazing > 1 ? "s" : ""}</div> : <div></div>}
          {stats.average > 0 ? <div>{stats.average} Average Day{stats.average > 1 ? "s" : ""}</div> : <div></div>}
          {stats.bad > 0 ? <div>{stats.bad} Bad Day{stats.bad > 1 ? "s" : ""}</div> : <div></div>}
          {stats.averageRating > 0 ? <div>Average Rating For Day: {stats.averageRating}</div> : <div></div>}
        </div>
        <div style={gridDiv}>
          <div style={dayNameStyle}>Sunday</div>
          <div style={dayNameStyle}>Monday</div>
          <div style={dayNameStyle}>Tuesday</div>
          <div style={dayNameStyle}>Wednesday</div>
          <div style={dayNameStyle}>Thursday</div>
          <div style={dayNameStyle}>Friday</div>
          <div style={dayNameStyle}>Saturday</div>
          {days.map((day, index) => {
            return <Day setEditDay={props.setEditDay} key={index} day={day}></Day>
          })}
        </div>
    </div>
  );
}

export default Month;