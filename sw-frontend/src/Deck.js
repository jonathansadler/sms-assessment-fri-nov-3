import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const Deck = ({ }) => {

    const [items, setcards] = useState([])

  useEffect(() => {
    const getcards = async () => {
      const cardsFromServer = await fetchcards()
      setcards(cardsFromServer)
    }

    getcards()
  }, [])

  // Fetch cards
  const fetchcards = async () => {
    const res = await fetch('http://localhost:5000/alldecks')
    const data = await res.json()

    return data
  }

  return (
    <>





{items.map(item => (
          <div key={item.id} className="cards-abc-1-decker" >
            <div>{item.name}</div>
            <button>-</button>
            <div>{item.faction}</div>
            <div>{item.card.length}</div>
          </div>

        ))}

    </>

)
}

export default Deck 