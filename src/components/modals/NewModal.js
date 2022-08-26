import { useState } from 'react'

/* Defines the modal used to create a new data object/workout list; located on the title page.  
 * props: processForm - function used to create the new workout list.
 *        setShowModal - boolean used to toggle the modal on and off.
 */

const FileModal = ({ processForm, setShowModal }) => {
  const [name, setName] = useState('')
  const [feet, setFeet] = useState()
  const [inches, setInches] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    // form checking
    if (!name) {
      alert('Please add a name.')
      return
    }
    if (!feet) {
      alert('Please specify a height in feet and inches.')
      return
    }
    // process/load data, reset values
    let height = 12 * parseInt(feet) + parseInt(inches)
    processForm(name, height)
    setName('')
    setFeet()
    setInches()
  }
  return (
    <>        
    <button className='modal-b' onClick={() => setShowModal(false)} />
    <div className='modal' id='file-modal'>
      <h3>Create New Workout List</h3><br />
      <form onSubmit={handleSubmit}>
        <label>Name:  </label>
        <input type="text" 
               placeholder='First Name' 
               value={name} 
               onChange={(e) => setName(e.target.value)} 
        /><br /><br />
        <label>Height:   </label>
        <input type="number"  
               min="1"
               max="9"
               value={feet} 
               onChange={(e) => setFeet(e.target.value)} 
        /> <label>ft</label> 
        <input type="number"  
               min="0"
               max="11"
               value={inches} 
               onChange={(e) => setInches(e.target.value)} 
        /> <label>in</label><br /><br />  
        <input type="submit" value="Create Workout Log" />
      </form>
    </div>
    </>
  )
}

export default FileModal