import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>
                {props.course}
            </h2>
        </div>
    )
}

const Part = props => <p> {props.part.name} {props.part.exercises} </p>

const Content = (props) => {
    return (
        <div>
            {props.parts.map((part, i) =>
                <Part key={props.parts[i].id} part={props.parts[i]} />
            )}
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <b>
                total of {props.parts.reduce((total, num) => num.exercises + total, 0)} exercises
            </b>
        </div>
    )
}


const App = (props) => {

    return (
        <div>
            <h1>Web development curriculum</h1>
            {props.courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header course={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            }
            )}

        </div>
    )
}

export default App