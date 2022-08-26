import React from 'react'
import { useState } from 'react'
const caryData = require('../../cary.json')

/* Defines the modal used to load in .wktlst files as data/workout list objects.
 * props: processForm - function used to take in text representation of file and load it in as the data object.
 *        setShowModal - boolean used to toggle this modal on and off.
 */
const LoadModal = ({ processForm, setShowModal }) => {
  const [file, setFile] = useState(null) // holds/updates file object changed by file input
  const [text, setText] = useState('') // holds text of file defined by 'file' state
  const [checkbox, setCheckbox] = useState(false) // stores state of checkbox

  var fr = new FileReader()
  fr.onload = function(e) {
    setText(e.target.result)
  }

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0])
      fr.readAsText(event.target.files[0])
    }
  }

  const handleCheckChange = () => {
    var bool = !checkbox
    setCheckbox(bool)
    if (bool) {
      setText(JSON.stringify(caryData))
    }
    else if (file) {
      fr.readAsText(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!checkbox) {
      if (file == null) {
        alert('Please specify a file.')
        return
      }
      
      if (file.name.length > 7 && file.name.substring(file.name.length - 7) !== '.wktlst') {
        alert('File not of type .wktlst. Please input a file of correct file type.')
        return
      }
    }
    processForm(text)
    setShowModal(false)
  }

  return (
    <>        
    <button className='modal-b' onClick={() => setShowModal(false)} />
    <div className='modal' id='file-modal'>
      <h3>Import Workout List</h3><br />
      <form onSubmit={handleSubmit}>

        <label>Use Cary's Default List         </label>
        <input type='checkbox' value={checkbox} onChange={handleCheckChange}></input> <br />
        {!checkbox && 
          <>
          <label>Choose File:   </label>
          <input type="file" onChange={handleFileChange}/><br />
          </>
        }
        <input type="submit" value="Import Workout Log" />
        
      </form>
    </div>
    </>
  )
}
//  style={{display: 'none'}}
export default LoadModal