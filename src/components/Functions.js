// Contains all functions imported from other Components.

/* converts all str dates in json to date objects. Used on inputted JSON files
 * from LoadModal (which have string representations of the dates) to convert 
 * them into the format used in the application.
 * Inputs: json - a workout list-formatted JSON object with string date representations.
 * Returns: modified json with each date str value replaced with a Date object.
 */
export const strToDateJSON = (json) => {
  for (var i = 0; i < json.workouts.length; i++) {
    var date_str = json.workouts[i].date
    var yyyy = date_str.substring(0, 4)
    var mm = date_str.substring(5, 7)
    var dd = date_str.substring(8)
    json.workouts[i].date = new Date(yyyy, mm - 1, dd)
  }
  return json
}

/* converts Date objects in json to string representations. Used when exporting
 * or duplicating the date object, as Date objects cannot be saved as a file. 
 * Inputs: json - a workout list-formatted JSON object with string date representations.
 * Returns: modified json with each Date value replaced with a string representation.
 */
export const dateToStrJSON = (json) => {
  for(var i = 0; i < json.workouts.length; i++) {
    json.workouts[i].date = json.workouts[i].date.substring(0, 10)
  }
  return json
}

// makes a deep copy of the data JSON, re-calculating each date object
// Inputs: orig_data - any JSON object in workout list format.
// Returns: a deep copy of orig_data. 
export const copyData = (orig_data) => {
  var copy_data = JSON.parse(JSON.stringify(orig_data))
  copy_data = dateToStrJSON(copy_data)
  copy_data = strToDateJSON(copy_data)
  return copy_data
}

/* Uses binary search to find the index of a given object from an array in descending order. 
 * Inputs: arr - array of JSON objects with a key of 'id' labeled in descending value.
 *         target_id - ID of desired JSON object.
 *         start - index to start looking at.
 *         end - last index to look at; start <= end.
 * Returns: index of object with desired ID
 */
const binarySearch = (arr, target_id, start, end) => {
  // error check
  if (start > end) {
    return -1
  }

  var mid = Math.floor((end - start) / 2) + start
  var t_id_val = getIDVal(target_id)
  var mid_id_val = getIDVal(arr[mid].id)

  if (mid_id_val === t_id_val) {
    return mid
  } 
  else if (mid_id_val < t_id_val) {
    return binarySearch(arr, target_id, start, mid - 1)
  }
  else if (mid_id_val > t_id_val) {
    return binarySearch(arr, target_id, mid + 1, end)
  }
}

/* Wrapper function for binarySearch.
 * Inputs: arr - array of JSON objects with a key of 'id' labeled in descending value.
 *         target_id - ID of desired JSON object.
 * Returns: index of object with desired ID.
 */
export const searchIDs = (arr, target_id) => {
    return binarySearch(arr, target_id, 0, arr.length - 1)

}

/* helper function for partition. Exracts the value
 * for comparison when comparing different workouts.
 * inputs: id - the id of a given workout.
 * Returns: int representing date section of id
*/
const getIDVal = (id) => {
  return parseInt(id.substring(id.indexOf(':') + 1))
}

/* helper function that performs partition function for quickSort.
 * Inputs: arr - list of workouts to be sorted.
 *         start - start index for partition function.
 *         end - end index for partition function.
 * Returns: index of final pivot. 
 */ 
const partition = (arr, start, end) => {
  // take last element as pivot
  const pivotValue = getIDVal(arr[end].id)
  var pivotIndex = start
  for (var i = start; i < end; i++) {
    var date_val = getIDVal(arr[i].id)
    if (date_val > pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]
      pivotIndex++
    }
  }
  // Putting the pivot value in the middle
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
  return pivotIndex;
}

/* sorts a list of workouts in decreasing date order, modifying the
 * original inputted array.
 * Inputs: arr - list of workouts to be sorted.
 *         start - start index for partition function.
 *         end - end index for partition function.
 */
const quickSort = (arr, start, end) => {
  if (start >= end) {
    return
  }
  var index = partition(arr, start, end)
  quickSort(arr, start, index - 1)
  quickSort(arr, index + 1, end)
}

/* wrapper function for quickSort.
 * Inputs: arr - list of workouts to be sorted.
 */
export const sortIDs = (arr) => {
  quickSort(arr, 0, arr.length - 1)
}