import { useState, useEffect } from "react";

const EditDay = (props) => {
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [feeling, setFeeling] = useState();
  const [rating, setRating] = useState();

  const updateDay = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        description: description ? description : "",
        feeling: feeling ? feeling : "",
        rating: rating ? rating : "",
      })
    }
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/day/${props.day._id}`, requestOptions);
  }

  useEffect(() => {
    setDate(new Date(props.day.date));
    setDescription(props.day.description);
    setFeeling(props.day.feeling);
    setRating(props.day.rating);
  }, []);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const outerDivStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }

  const headerStyle = {
    fontSize: "2rem",
    margin: "1rem"
  }
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }

  const labelStyle = {
    marginTop: "1rem",
    marginBottom: "0.5rem"
  }

  const buttonGroupStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
  const ratingGroupStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
  const backButtonStyle = {
    margin: "1rem"
  }

  return (
    <div style={outerDivStyle}>
      <div style={headerStyle}>{date && `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</div>
      <form onSubmit={updateDay} style={formStyle}>
        <div style={labelStyle}>Description of your day!</div>
        <textarea onChange={e => setDescription(e.target.value)} value={description} placeholder="Describe Your Day"></textarea>
        <div style={labelStyle}>Pick a description of your day!</div>
        <div style={buttonGroupStyle}>
          <label>Bad</label>
          <input type="radio" name="rating"  checked={feeling==="Bad"}  onChange={() => setFeeling("Bad")}></input>
          <label>Average</label>
          <input type="radio" name="rating" checked={feeling==="Average"} onChange={() => setFeeling("Average")}></input>
          <label>Amazing</label>
          <input type="radio" name="rating" checked={feeling==="Amazing"} onChange={() => setFeeling("Amazing")}></input>
          <label>Best Day Ever</label>
          <input type="radio" name="rating" checked={feeling==="Best Day Ever"} onChange={() => setFeeling("Best Day Ever")}></input>
        </div>
        <div style={ratingGroupStyle}>
          <div style={labelStyle}>Rate Your Day on a Scale From 1-10</div>
          <input value={props.day.rating} type="number" min="1" max="10" onChange={e => setRating(e.target.value)}></input>
        </div>
        <button style={backButtonStyle} type="submit">Done</button>
      </form>
    </div>
  )
}

export default EditDay;