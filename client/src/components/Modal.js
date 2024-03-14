import { useState } from "react"

export default function Modal({mode, setShowModal, getData, task }) {
  const editMode = mode === "edit" ? true : false
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : 'alexander@test.com',
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  })


 async function postData(e){
  e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status === 200){
        console.log("worked");
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  async function editData(e){
    e.preventDefault()
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        if(response.status === 200){
          console.log("worked");
          setShowModal(false)
          getData()
        }
      } catch (err) {
        console.error(err.message)
      }
    }

  function handleChange(e){
    console.log('change')
    const {name, value} = e.target

    setData( data => ({
      ...data, 
      [name] : value
    }))
  }

  console.log(data, "data")

  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
          <h3>Let's {mode} your task</h3>
          <button onClick={()=>setShowModal(false)}>x</button>
        </div>
        <form>
          <input required maxLength={30} placeholder='Your task goes here' name='title' value={data.title} onChange={handleChange}/>
          <label htmlFor='range'>Drag to select your current progress</label>
          <input required type='range' id='range' min="0" max="100" name='progress' value={data.progress} onChange={handleChange}/>
          <input className={mode} type='submit' onClick={editMode ? editData : postData}/>
        </form>
      </div>
    </div>
  )
}
