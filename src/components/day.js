import Mood from "@material-ui/icons/Mood";
import MoodBad from "@material-ui/icons/MoodBad";
import SentimentSatisfied from "@material-ui/icons/SentimentSatisfied";
import { useState, useEffect } from "react";


const Day = (props) => {
  const date = new Date(props.day.date);
  const [isCurrentDay, setIsCurrentDay] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    if (currentDate.getFullYear() === date.getFullYear() 
    && currentDate.getMonth() === date.getMonth() 
    && currentDate.getDate() === date.getDate()) {
      setIsCurrentDay(true);
    } else {
      setIsCurrentDay(false);
    }
  }, []);

  let colorDivColor;
  let emoji;
  switch (props.day.feeling) {
    case "Bad":
      colorDivColor = "red";
      emoji = <MoodBad></MoodBad>
      break;
    case "Average":
      colorDivColor = "black";
      emoji = <SentimentSatisfied></SentimentSatisfied>
      break;
    case "Amazing":
        colorDivColor = "green";
        emoji = <Mood></Mood>
      break;
    case "Best Day Ever":
        colorDivColor = "pink";
        emoji = <Mood style={{ color: "pink" }}></Mood>
        break;
    default: 
      colorDivColor = "white";
      emoji = <div style={{ height: "27px" }}></div>
  }

  const colorDivStyle = {
    height: "20px",
    backgroundColor: `${colorDivColor}`
  }
  const dayNumberStyle = {
    fontWeight: "bold"
  }
  if (!props.day.date) {
    return <div></div>
  }
  return (
    <div className={isCurrentDay ? "day currentDay" : "day"} onClick={() => props.setEditDay(props.day)}>
      <div style={dayNumberStyle}>{date.getDate()}</div>
      <div>{emoji}</div>
      <div style={colorDivStyle}></div>
    </div>
  );
}

export default Day;