import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleclick, text }) => (
  <button onClick={handleclick}>{text}</button>
)

const Statistic = props => (
  <tr>
    <td>{props.text}</td><td>{props.value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all }) => {

  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={isNaN(average) ? 0 : average} />
        <Statistic text="positive" value={isNaN(positive) ? 0 + " %" : positive + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleclick={() => setGood(good + 1)} text="good" />
      <Button handleclick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleclick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={good + neutral + bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)