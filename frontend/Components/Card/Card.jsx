import React from 'react'
import "./card.scss"

const Card = ({ img, onClick }) => (
    <img className='card' src={img} alt="cover" onClick={onClick} />
  )

export default Card
