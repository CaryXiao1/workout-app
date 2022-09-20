import LineGraph from './LineGraph'
import { useState } from 'react'

/* Defines list of statistics/graphs that show different 
 * aspects of the given workout list.
 * props: data - JSON representing the workout list.
 */
const GraphsList = ({ data }) => {
  const [bTypeData, setBTypeData] = useState()
  const [weightData, setWeightData] = useState()

  /* Converts arrays of labels and values into the JSON
   * format needed to input into Graph.
   * Inputs: dataset_name - the name of the line in the line graph
   *         labels - array of Date Objects; converted into string representations
   *         values - array of numbers for each label's corresponding value
   * Returns: JSON in format aligning with 'data' input for a Graph component.
   */
  const formatData = (dataset_name, labels, values) => {
    return {
      labels: labels.map(date => (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()),
      datasets: [{
        label: dataset_name,
        backgroundColor: 'rgba(217, 149, 2, 0.33)',
        borderColor: '#d99502',
        tension: .25,
        fill: true,
        borderWidth: 2,
        data: values}
      ]
    }
  }

  /* Modifies the first Graph component (for Weights/BMI) to update 
   * its data when the corresponding select options box is changed
   */
  const handleBType = (e) => {
    if (e.target.value) {
      var [weights, dates] = getWeights()
      if (e.target.value === 'BMI') {
        weights = weights.map(weight => weightToBMI(weight))
      }
      setBTypeData(formatData(e.target.value, dates, weights))
  }
  }

  /* Modifies the second Graph component (for exercise weights) to 
   * update its data when the corresponding select options box is changed
   */
  const handleExName = (e) => {
    if (e.target.value) {
      var info = getExInfo(e.target.value)
      // create & set weightData, repsData based on info
      setWeightData(formatData(e.target.value, info[3], info[2]))
    }
  }


  /* Converts a given weight to its BMI value based on
   * the stored height. Used by handleBType to display
   * graphs with BMI.
   * Returns: number representing BMI of the given weight.
   */
  const weightToBMI = (weight) => {
    return weight * 703 / (data.height * data.height)

  }

  /* returns an array of all workout body weights in
   * the workout list and their respective dates.
   * Returns: 2 x (# weights) Array containing all listed body  
   *          weights and their workout dates in chronological order.
   */
  const getWeights = () => {
    var weights = []
    var dates = []
    for (var i = getTotalWorkouts() - 1; i >= 0; i--) {
      var workout_weight = data.workouts[i].weight

      if (workout_weight) {
        weights.push(workout_weight)
        dates.push(data.workouts[i].date)
      }
    }
    return [weights, dates]
  }

  /* Helper function for getExInfo, finding the highest weight value in each 
   * element of weights.
   * Inputs: weights - array of strings representing eight a single weight
   *                   or multiple weights.
   * Returns: array of length (num weights) with each element as the maximum weight
   *          found in each original element.
   */
  const getMaxWeights = (weights) => {
    
    var weights_copy = JSON.parse(JSON.stringify(weights))
    for (var i = 0; i < weights_copy.length; i++) {
      // remove all letters
      weights_copy[i].replace(/[A-Za-z]/g, "") // weights_copy[i].replace(/[^a-z\d\s]+/gi, "")
      // Case 1: only one weight is provided, so just convert into a Float
      if (weights_copy[i].indexOf(' ') === -1) {
        weights_copy[i] = parseFloat(weights_copy[i])
      }
      // Case 2: multiple are provided, so set to highest weight value
      else {
        var arr = weights_copy[i].split(' ')
        
        arr = arr.map(Number)
        weights_copy[i] = Math.max(...arr)
      }
    }
    return weights_copy 
  }

  /* Returns array of sets, reps, weights, and the workout 
   * date for a given exercise name.
   * Inputs: exName - the exercise name to search weights for.
   * Returns: 4 x (num exercises) array with weights and dates.
   */
  const getExInfo = (exName) => {
    var [sets, reps, weights, dates] = [[], [], [], []]
    for (var wkt_i = getTotalWorkouts() - 1; wkt_i >= 0; wkt_i--) {
      for (var ex_i = 0; ex_i < data.workouts[wkt_i].exercises.length; ex_i++) {
        var exercise = data.workouts[wkt_i].exercises[ex_i]
        if (exercise.name === exName) {
          sets.push(exercise.numSets)
          reps.push(exercise.reps)
          weights.push(exercise.weight)
          dates.push(data.workouts[wkt_i].date)
        }
      }
    }
    weights = getMaxWeights(weights)

    return [sets, reps, weights, dates]
  }

  /* returns array containing all unique exercise names
   * in data.
   * Returns: array of strings representing unqiue workout names.
   */
  const getUniqueExercises = () => {
    var arr = []
    for (var wkt_i = 0; wkt_i < getTotalWorkouts(); wkt_i++) {
      for (var ex_i = 0; ex_i < data.workouts[wkt_i].exercises.length; ex_i++) {
        var ex_name = data.workouts[wkt_i].exercises[ex_i].name
        if (arr.indexOf(ex_name) === -1) {
          arr.push(ex_name)
        }
      }
    }
    arr.sort()
    return arr
  }

  /* Helper function for getAvgWorkouts & getLatestWorkouts.
   * Returns: time (in miliseconds) since January 1, 1970
   *          and 12:00 AM today.
   */
  const getToday = () => {
    var now = new Date()
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return today.getTime()
  }

  /* Retuns the average number of workouts per week, based on the
   * time difference between the earliest and today.
   * Returns: number representing average workouts/week. If there are 
   *          no workouts or the earliest exercise is in the future, 
   *          returns error statement.
   */
  const getAvgWorkouts = () => {
    // error check for >= 2 exercises
    if (data.workouts.length > 0) {
      var earliest_date = data.workouts[data.workouts.length - 1].date
      // find difference between today's date (@ 12 AM) and the first workout.
      var diff_miliseconds = getToday() - earliest_date.getTime()
      if (diff_miliseconds <= 0) {
        return 'Earlist workout is in the future.'
      }
      var diff_days = diff_miliseconds / (1000 * 60 * 60 * 24)
      return (getTotalWorkouts() / diff_days * 7)
    }
    else {
      return 'No workouts in workout list.'
    }
  }

  /* Returns a list of workouts that have occured in the last 
   * (num_days) days. 
   * Inputs: num_days - an integer representing the # of days before
   *                    today to count.
   * Returns: list of workouts that have occured in the last (num_days) days.
   */
  const getNumLatestWorkouts = (num_days) => {
    var week_ago = getToday() - (num_days * 24 * 60 * 60 * 1000) // <- represents # of miliseconds in a week.
    var result_arr = 0
    for (var i = 0; i < data.workouts.length; i++) {
      if (data.workouts[i].date.getTime() > week_ago) {
        result_arr++
      }
      else {
        return result_arr
      }
    }
    return result_arr
  }

  /* returns total number of exercises in data.
   * Returns: int representing total # of exercises.
   */
  const getTotalExercises = () => {
    var num_exercises = 0 
    for (var i = 0; i < getTotalWorkouts(); i++) {
      num_exercises += data.workouts[i].exercises.length
    }
    return num_exercises
  }

  /* returns total number of workouts in data.
     Returns: int representing length of data.workouts array.
   */
  const getTotalWorkouts = () => {
    return data.workouts.length
  }


  return (
    <>
      <h2 className='centered'>Statistics</h2> <br /><br />
      <div className='table'>
        <div><p> Total Workouts: {getTotalWorkouts()} </p></div>
        <div><p> Total Exercises: {getTotalExercises()} </p></div>
        <div><p> Average Workouts per Week: {Math.round(getAvgWorkouts() * 100) / 100}</p></div> {/* used to round average to hundredth's place */}
        <div><p> # Workouts in the last 7 Days: {getNumLatestWorkouts(7)}</p></div>
        <div><p> # Workouts in the last 30 Days: {getNumLatestWorkouts(30)}</p></div>
        <div><p> # Workouts in the last 365 Days: {getNumLatestWorkouts(365)}</p></div>
      </div>
      <br />
      <h2>Graphs</h2>
      <div className='header-left'>
      <label>Select Weight or BMI:</label>
      </div>
      <div className='header-right'>
        <select className='black' onChange={handleBType}>
          <option value=''>----</option>
          <option value='Weight'>Weight</option>
          <option value='BMI'>BMI</option>
        </select>
      </div>
      <br /><br />
      {bTypeData && <LineGraph data={bTypeData}/>}
      <br />
      {!bTypeData && 
      <>
      <h3 className='centered'>
        <i>Please choose BMI or weight to show progression over time.</i>
        
      </h3>
      <br /><br /><br />
      </>
      }
      
      <div className='header-left'>
        <label>Select Exercise:</label>
      </div>
      <div className='header-right'>
      <select className='black' onChange={handleExName}>
          <option value=''>----</option>
          {
            getUniqueExercises().map(ex => {
              return (<option key={ex} value={ex}>{ex}</option>)
            })
          }
        </select>
      </div>
      <br /><br />
      {weightData && <LineGraph data={weightData}/>}
      <br />
      {!weightData && 
      <>
      <h3 className='centered'>
        <i>Please select an exercise to view weight progression over time.</i>
      </h3>
      <br /><br />
      </>}
    </>
  )
}

export default GraphsList