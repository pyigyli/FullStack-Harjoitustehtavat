import React from 'react'

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part =>
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      )}
    </div>
  )
}

const Total = (props) => {
  var amount = 0;
  var sum = props.parts.reduce((s, p) => {return s + p.exercises}, amount)

  return (
    <p>
      yhteensä {sum} tehtävää
    </p>
  )
}

const Course = (props) => {
  const {course} = props;
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course