import { searchIDs } from "../Functions"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Defines a single exercise as mapped in ExerciseList. 
 * props: exercises - JSON object containing all the exercises for the specified Workout.
 *        ex - JSON object containing the specific workout that this object renders.
 *        setExercises: function that sets the exercises for the given workout.
 */
const Exercise = ({ exercises, ex, setExercises }) => {

  /* creates JSON object of exercise with set arguments; used to 
   * update exercises in WorkoutModal parent component.
   * Returns: JSON object representing exercise with set name, id, numSets, numReps, & weight
   */
  const updateExercise = (name, id, numSets, numReps, weight) => {
    var new_ex = {
      name: name,
      id: id,
      numSets: numSets,
      reps: numReps,
      weight: weight
    }
    var new_exercises = JSON.parse(JSON.stringify(exercises))
    new_exercises[searchIDs(new_exercises, id)] = new_ex
    setExercises(new_exercises)
  }

  /* helper function for removeExercise; resets ids of an inputted array 
   * formatted like exercises.
   * Inputs: arr - array formatted like 'exercises'.
   */
  const resetIDs = (arr) => {
    var id_val = arr.length - 1
    for (var i = 0; i < arr.length; i++) {
      arr[i].id = 'x:' + id_val
      id_val--
    }
  }

  /* Used to remove an exercise of a specific key; called when
   * the specific exercise's x-button is clicked.
   */
  const removeExercise = (id) => {
    var new_exercises = JSON.parse(JSON.stringify(exercises))
    // remove exercise with specified id
    var ex_index = searchIDs(new_exercises, id)
    if (ex_index === -1) {
      alert('Error: could not find exercise with specified ID.')
      return
    }
    new_exercises.splice(ex_index, 1)
    resetIDs(new_exercises)
    setExercises(new_exercises)
  }

  return (
    <div className='exercise'>
      <div className='Xmark'>
        <FontAwesomeIcon icon={faXmark} onClick={() => {removeExercise(ex.id)}}/>
      </div>
      <label >Name: </label>
      <input type="text" 
             value={ex.name}
             onChange={(e) => updateExercise(e.target.value, ex.id, ex.numSets, ex.reps, ex.weight)} 
      /><br />
      <label># Sets: </label>
      <input type="text" 
             value={ex.numSets} 
             onChange={(e) => updateExercise(ex.name, ex.id, e.target.value, ex.reps, ex.weight)}
      /><br />
      <label># Reps: </label>
      <input type="text" 
             value={ex.reps} 
             onChange={(e) => updateExercise(ex.name, ex.id, ex.numSets, e.target.value, ex.weight)}
      /><br />
      <label >Weight: </label>
      <input type="text" 
             value={ex.weight} 
             onChange={(e) => updateExercise(ex.name, ex.id, ex.numSets, ex.reps, e.target.value)}
      />

    </div>
  )
}

export default Exercise