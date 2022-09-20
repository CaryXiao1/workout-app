import React from 'react'
import Workout from './Workout'

/* Defines the list of workouts of the defined data/workout list. 
 * props: data - JSON object that carries all information about the workout list.
 *        setData - function that modifies the information in data. 
 */
const WorkoutList = ({ data, setData }) => {
  return (
    <div className='table'>  
      {data.workouts.map((workout) =>  (
        <div key={workout.id}>
          <Workout workout={workout} data={data} setData={setData} />
        </div>
      ))}
    </div>
  )
}
export default WorkoutList