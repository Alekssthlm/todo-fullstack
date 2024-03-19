import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth';

function App() {
  const [tasks, setTasks] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken

  async function getData(){
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      console.log(json);
      setTasks(json)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }
  }, [])

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  console.log(sortedTasks, 'sort')
  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken && 
      <div className='app-container'>
        <div className='sidebar'>
          <span className='logo'>
            LOGO
          </span>
          <button>DARK</button>
        </div>
        <div className='app-main'>
      <ListHeader listName={"Welcome back!"} getData={getData}/>
      <div className='todo-container'>
        <div className='todo-title'>
          <span>My tasks</span>
        </div>
        <div className='todos-wrapper'>

      {sortedTasks?.map(task => {
        return <ListItem key={task.id} task={task} getData={getData}/>
      })}
      </div>
      </div>
      </div>
      </div>
      }
    </div>
  );
}

export default App;
