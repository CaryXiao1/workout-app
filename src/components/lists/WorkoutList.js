import React from 'react'
import Workout from './Workout'

/* Defines the list of workouts of the defined data/workout list. 
 * props: data - JSON object that carries all information about the workout list.
 *        setData - function that modifies the information in data. 
 */

const WorkoutList = ({ data, setData }) => {
  // passed to Workout objects; calls changeData after 
  // creating new data object with changed specified workout
  //function changeWorkout(workout) {
  //  console.log('changeWorkout works!')
  //}
  

  return (
    <table id='workout-table'>  
      {data.workouts.map((workout) =>  (
        <tr key={workout.id}>
          <Workout workout={workout} data={data} setData={setData} />
        </tr>
      ))}
    </table>
  )
}
export default WorkoutList