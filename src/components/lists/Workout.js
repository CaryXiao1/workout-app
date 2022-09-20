import WorkoutModal from '../modals/WorkoutModal'

import { useState } from 'react'

/* Defines a specific workout row and modal; called as a map from WorkoutList.
 * props: workout - JSON object specifying the specific workout that this object is designed to render.
 *        data - JSON object carrying all information for the WorkoutList.
 *        setData - function that modifies the information in the data object.
 */
const Workout = ({workout, data, setData}) => {
    let title = workout.title
    // calculate dates in various formats
    let date = workout.date
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();
    let date_str = mm + '-' + dd + '-' + date.getFullYear()

    let numExercises = Object.keys(workout.exercises).length
    
    const [showModal, setShowModal] = useState(false) // used to toggle modal
  
    return (
    <div>
        <button className='workout' onClick={() => setShowModal(true)}>
            <div className='workout-left'>
                <p>{title}</p>
            </div>
            <div className='workout-right'>
                <p>{date_str}</p>
                <p># Exercises: {numExercises}</p>
            </div>
        </button>
        {showModal && <WorkoutModal data={data} workout={workout} setData={setData} setShowModal={setShowModal}/>}
    </div>

  )
}

export default Workout