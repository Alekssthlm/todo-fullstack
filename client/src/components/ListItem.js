import TickIcon from "./TickIcon"
import ProgressBar from "./ProgressBar"
import { useState } from "react"
import Modal from "./Modal"

export default function ListItem({task, getData}) {
  const [showModal, setShowModal] = useState(false)
  console.log(process.env.REACT_APP_SERVERURL, "env")

  async function deleteItem(e){
    e.preventDefault()
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
          method: 'DELETE'
        })
        if(response.status === 200){
          getData()
        }
      } catch (err) {
        console.error(err.message)
      }
    }

  return (
    <li className='list-item'>
      <div className='info-container'>
      <TickIcon />
      <p className='task-title'>{task.title}</p>
      </div>

      <div className="button-container">
      <ProgressBar progress={task.progress} />
        <button className="edit" onClick={()=>setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={deleteItem}>DELETE</button>
      </div>
      {showModal && <Modal mode={"edit"} setShowModal={setShowModal} getData={getData} task={task}/>}
    </li>
  )
}
