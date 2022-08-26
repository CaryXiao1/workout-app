import ExerciseList from '../lists/ExerciseList'
import Button from '../Button'
import { useState } from 'react'
import { copyData, searchIDs, sortIDs } from '../Functions'

/* Defines the modal section of a given workout.
 * props: data - JSON object representing all information in the workout list.
 *        workout - JSON object carrying the information for the specific workout.
 *        setData - function used to modify the data object.
 *        setShowModal - boolean used to toggle this modal on/off.
 */
const WorkoutModal = ({ data, workout, setData, setShowModal}) => {
  // set unchanged ID (to check if ID was modified)

  // calculate dates in various formats
  var date = workout.date
  var mm = date.getMonth() + 1 // getMonth() is zero-based
  var dd = date.getDate()
  // define states for form
  const [workoutTitle, setWorkoutTitle] = useState(workout.title)
  const [dateField, setDateField] = useState(
    [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
   ].join('-'))
  const [dateStr, setDateStr] = useState(mm + '-' + dd + '-' + date.getFullYear())
  const [weight, setWeight] = useState(workout.weight)
  const [exercises, setExercises] = useState(workout.exercises)

  const createWorkout = (id, date) => {
    return {
      title: workoutTitle,
      id: id,
      date: date,
      weight: weight,
      exercises: exercises
    }
  }

  /* Removes specified workout from the Workout List, automatically
   * updating the list using setData.
   * Inputs: id - the id of the desired workout to remove
   */
  const removeWorkout = () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      var new_data = copyData(data)
      new_data.workouts.splice(searchIDs(new_data.workouts, workout.id), 1)
      setData(new_data)
    }  
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // make sure Workout Name & Date are set
    if (!workoutTitle) {
      alert('Please add a name for this workout.')
      return
    }
    if (dateStr === '--') {
      alert('Please specify a date.')
      return
    }
    
    // create date object from dateField, construct new id
    var new_date = new Date(dateField.substring(0, 4), parseInt(dateField.substring(5, 7)) - 1, dateField.substring(8))
    var new_id = workoutTitle + ':' + new_date.getTime()
    var new_data = copyData(data)
    var new_workout = createWorkout(new_id, new_date)
    if (new_id !== workout.id) {
      // must use linear search: have to compare both the name and date of a given workout.
      for (var i = 0; i < data.workouts.length; i++) {
        if (new_id === data.workouts[i].id) {
          alert('Workouts cannot have both the same name and date. Please specify a unique name or date.')
          return
        }
      } 
      
      if (workout.id === 'new') {
        // update data to include the new workout at end, then sort
        
        new_data.workouts = new_data.workouts.concat([new_workout]) 
        sortIDs(new_data.workouts)
        setData(new_data)
        setShowModal(false)
        return
      }
      // remove original ID and add new ID workout to end, then sort
      new_data.workouts.splice(searchIDs(new_data.workouts, workout.id), 1)
      new_data.workouts = new_data.workouts.concat([new_workout]) 
      
      sortIDs(new_data.workouts)
      setData(new_data)
      setShowModal(false)
    }
    else {
      // replace original workout with new workout
      new_data.workouts[searchIDs(new_data.workouts, workout.id)] = new_workout
      setData(new_data)
      setShowModal(false)
    }
  }
  
  // function updates both dateField and date_str 
  const handleDateField = (e) => {
    let yyyy_mm_dd = e.target.value
    // remove excess zeroes
    let year = yyyy_mm_dd.substring(0, 4)
    let month = (yyyy_mm_dd[5] !== '0') ? yyyy_mm_dd.substring(5, 7) : yyyy_mm_dd.substring(6, 7)
    let day = (yyyy_mm_dd[8] !== '0') ? yyyy_mm_dd.substring(8) : yyyy_mm_dd.substring(9)
    setDateField(yyyy_mm_dd) 
    setDateStr(month + '-' + day + '-' + year)
  }

  // used to add an exercise to the top of the list
  const addExercise = () => {
    const id = exercises.length
    const newExercise = {
      name: '',
      id: 'x:' + id,
      numSets: '',
      reps: '',
      weight: 0
    }
    setExercises([newExercise, ...exercises])
  }
  
  return (
    <>        
        <button className='modal-b' onClick={() => setShowModal(false)} />
        <div className='modal'>
            <Button size='m' backColor='transparent' color='white' text='Close Workout' onClick={() => {setShowModal(false)}} />
            <h1>{workoutTitle + ' ' + dateStr}</h1>
            <br />
            <Button size='m' backColor='#d99502' color='black' text='Add Exercise' onClick={addExercise} />
            <form onSubmit={handleSubmit}>
                <label>Workout Name: </label>
                <input 
                  type="text" 
                  value={workoutTitle} 
                  onChange={(e) => setWorkoutTitle(e.target.value)}
                /><br />
                <label>Date: </label>
                <input 
                  type="date" 
                  value={dateField}
                  onChange={handleDateField}
                  /><br />
                <label>Your Weight (Optional): </label>
                <input type='number'
                       value={weight}
                       onChange={(e) => setWeight(parseInt(e.target.value))}
                  />lbs<br />
                
                <ExerciseList exercises={exercises} setExercises={setExercises} />
                <div>
                  <input type="submit" value="Submit" />
                  <Button size='m' backColor='transparent' color='white' text='Delete' onClick={removeWorkout} />
                </div>

            </form>
        </div>
    </>
  )
}

export default WorkoutModal