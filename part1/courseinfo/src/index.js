import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}

const Part = props => <p> {props.part.name} {props.part.exercises} </p>

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises { props.parts.reduce((total, num) => num.exercises + total, 0) }
      </p>
    </div>
  )
}


const App = () => {

  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>

      {/* Header takes care of rendering the name of the course */}
      <Header course={course.name} />

      {/* Content renders the parts and their number of exercises */}
      <Content parts={course.parts} />

      {/* Total renders the total number of exercises */}
      <Total parts={course.parts} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
