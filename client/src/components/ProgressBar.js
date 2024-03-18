import React, { useEffect, useState } from 'react'

export default function ProgressBar({progress}) {
  const [color, setColor] = useState('red')

useEffect(() => {
  if(progress < 25){
    setColor('#ea7171')
  } else if(progress >= 26 && progress <= 70){
    setColor('#ebb271')
  } else {
    setColor('#90ea71')
  }
}, [progress])

  return (
    <div className='outer-bar'>
      <div 
      className='inner-bar'
      style={{ width: `${progress}%`, backgroundColor: `${color}`}}
      >
      </div>
    </div>
  )
}
