import logo from '../../logo.svg'
import WorkoutList from '../lists/WorkoutList'
import Button from '../Button'
import WorkoutModal from '../modals/WorkoutModal'
import LoadModal from '../modals/LoadModal'
import GraphsList from '../lists/GraphsList'

import { useState } from 'react'

/* 'Container' for the main part of the app. Replaces the title card once a 
 * a workout list is created or a list is loaded in.
 * props: data - JSON object that contains all workout list information.
 *        setData - function used to change data
 */
const Container = ({ data, setData }) => {
  let title = data.name + "'s Log"
  let today = new Date()

  const [showNewWorkout, setShowNewWorkout] = useState(false)
  const newWorkout = {
    title: 'New Workout',
    id: 'new',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    exercises: []
  }
  const [showLoad, setShowLoad] = useState(false)
  const [showWList, setShowWList] = useState('list')

  // converts all str dates in json to date objects
  const strToDateJSON = (json) => {
    for (var i = 0; i < json.workouts.length; i++) {
      var date_str = json.workouts[i].date
      var yyyy = date_str.substring(0, 4)
      var mm = date_str.substring(5, 7)
      var dd = date_str.substring(8)
      json.workouts[i].date = new Date(yyyy, mm - 1, dd)
    }
    return json
  }

  const processLoad = (file_text) => {
    var data_new = JSON.parse(file_text)
    data_new = strToDateJSON(data_new)
    setData(data_new)
  }
  

  // converts Date objects in inputted JSON into strings
  const dateToStrJSON = (json) => {
    for(var i = 0; i < json.workouts.length; i++) {
      json.workouts[i].date = json.workouts[i].date.substring(0, 10)
    }
    return json
  }

  const exportData = () => {
    // get name for file
    let name = ''
    let prompt_str = 'Enter file name to download:'
    while (name === '') {
      name = prompt(prompt_str)
      if (name === '' || name === null) {
        prompt_str = 'File name cannot be empty. Please enter file name to download'
      }
    }
    if (name !== '' && name !== null) {
      // modify data object so dates are strings; pass in copy of data object
      var data_modify = dateToStrJSON(JSON.parse(JSON.stringify(data)))
      // create link and download .wktlst file
      const a = document.createElement("a")
      var data_str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data_modify))
      a.setAttribute("href", data_str)
      a.setAttribute("download", name + ".wktlst")
      a.click()
    }
  } 
  return (
    
    <div className='container' id='main'>
        <div id='header'>
            <div className='header-left'>
                <img src={logo} id="header-logo" alt="small-logo" />
                <h1>{ title }</h1>
            </div>
            <div className='header-right'>
                <button className='black' onClick={exportData}>Export File</button>
                <button className='black' onClick={() => setShowLoad(true)}>Load File</button>
                <select className='black' name="view-type" id="view-type" onChange={(e) => {setShowWList(e.target.value)}}>
                <option className='black' value='1'>Workout List</option>
                <option className='black' value=''>Stats & Graphs</option>
                </select>
            </div>
            {showLoad && <LoadModal processForm={processLoad} setShowModal={setShowLoad} setData={setData} />}

        </div>
        
        {showWList && 
        <>
        <div className='centered'>
          <Button size='m' backColor='#d99502' color='black' text='New Workout' onClick={() => setShowNewWorkout(true)}/> <br />
        </div>  
        <br /><br /><br />
        </>}
        {showNewWorkout && <WorkoutModal data={data} workout={newWorkout} setData={setData} setShowModal={setShowNewWorkout} />}
        
        {showWList && 
        <WorkoutList data={data} setData={setData}/>
        }
          
        {!showWList && <GraphsList data={data} />}
    </div>
  )
}

export default Container