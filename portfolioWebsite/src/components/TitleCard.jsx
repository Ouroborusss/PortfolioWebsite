import { useState } from 'react'
import './TitleCard.css'

function TitleCard() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="title-card">
        <h1>Ouroborussss</h1>
        <h2>A game about the cycle of life</h2>
      </div>
    </>
  )
}

export default TitleCard
