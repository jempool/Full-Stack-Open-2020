import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleNextClick, text }) => (
  <button onClick={handleNextClick}>{text}</button>
)

const MostVotes = ({ anecdotes, points}) => {
  let maxIndex = points.indexOf(Math.max(...points))
  return (
    <div>
      {anecdotes[maxIndex]} <br />
       has {points[maxIndex]} votes <br />
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(props.points)

  const handleNextClick = () => {
    let rand = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(rand)
  }

  const handleVotetClick = (selected) => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button handleNextClick={() => handleVotetClick(selected)} text="vote" />
      <Button handleNextClick={handleNextClick} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <MostVotes anecdotes={props.anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0);

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)