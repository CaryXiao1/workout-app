import { useState } from 'react';
import logo from '../../logo.svg';

import Button from '../Button';
import NewModal from '../modals/NewModal';
import LoadModal from '../modals/LoadModal';

/* Defines title card used to load / create a new workout list.
 * props: setShowTitle - boolean prop that defines whether 
 *        setData - function used to change the workout list JSON object
 */
const Title = ({ setShowTitle, setData }) => {
  // used to toggle modals for importing/creating a new file
  const [showNew, setShowNew] = useState(false)
  const [showLoad, setShowLoad] = useState(false)

  // processes form data in new/load modal
  const processNew = (name, height) => {
    setData({
      name: name,
      height: height,
      workouts: [],
    })
    setShowTitle(false)
  }

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
    setShowTitle(false)
  }
  
  return (
    <div className="App-header" id='landing'>
    <img src={logo} className="App-logo" alt="logo" />
    <h2 className="title">
      Workout App
    </h2>
    <p className="subtitle">
      <em>by Cary Xiao - <a href='https://github.com/CaryXiao1/workout-app/tree/master' target="_blank" rel="noopener noreferrer">Source Code</a></em>
    </p>
    <div>
      <Button id='new-btn' size='scale' text="Start New" color='black' backColor='#d99502' onClick={() => setShowNew(true)}/>
      <Button id='load-btn' size='scale' text="Load File" color='white' onClick={() => setShowLoad(true)}/>
    </div>
    {showNew && <NewModal processForm={processNew} setShowModal={setShowNew} />}
    {showLoad && <LoadModal processForm={processLoad} setShowModal={setShowLoad}/>}
  </div>
  )
}

export default Title