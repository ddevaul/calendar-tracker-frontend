import Mood from "@material-ui/icons/Mood";
import MoodBad from "@material-ui/icons/MoodBad";
import SentimentSatisfied from "@material-ui/icons/SentimentSatisfied";

const Legend = () => {
  const outerDivStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    borderBottom: "1px solid black",
  }
  const legendHeader = {
    fontSize: "1.5rem",
    fontWeight: "bold"
  }
  const legendRow = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
  const legendRowStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "20px"
  }
  return (
    <div style={outerDivStyle}>
      <div style={legendHeader}>Legend:</div>
      <div style={legendRow}>
          <div style={legendRowStyle}>
            <div>Best Day Ever</div>
            <Mood style={{ color: "pink" }}></Mood>
            <div style={{ height: "20px", width: "20px", backgroundColor: "pink" }}></div>
          </div>
          <div style={legendRowStyle}>
            <div>Amazing</div>
            <Mood></Mood>
            <div style={{ height: "20px", width: "20px", backgroundColor: "green" }}></div>
          </div>
          <div style={legendRowStyle}>
            <div>Average</div>
            <SentimentSatisfied></SentimentSatisfied>
            <div style={{ height: "20px", width: "20px", backgroundColor: "black" }}></div>
          </div>
          <div style={legendRowStyle}>
            <div>Bad</div>
            <MoodBad></MoodBad>
            <div style={{ height: "20px", width: "20px", backgroundColor: "red" }}></div>
          </div>
      </div>
    </div>
  );
}

export default Legend;