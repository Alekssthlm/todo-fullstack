import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'

function App() {
  const [tasks, setTasks] = useState(null)
  const userEmail = 'alexander@test.com'

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

  useEffect(() => getData, [])

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  console.log(sortedTasks, 'sort')
  return (
    <div className='app'>
      <ListHeader listName={"holiday tick list"} getData={getData}/>
      {sortedTasks?.map(task => {
      return <ListItem key={task.id} task={task} getData={getData}/>
      })}
    </div>
  );
}

export default App;
