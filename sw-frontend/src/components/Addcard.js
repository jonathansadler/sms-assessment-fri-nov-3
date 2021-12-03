import { useState, useEffect } from 'react'

const Addcard = ({ cardida, onAdd }) => {
  const [name, setText] = useState('')
  //const [day, setDay] = useState('')
  const [faction, setFaction] = useState('')
  const [addcardid, setCardid] = useState(cardida)
  const [reminder, setReminder] = useState(false)


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

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please add deck name')
      return
    }

    onAdd({ name, faction, addcardid, reminder })

    setText('')
    //setDay('')
    setFaction('Rebel')
    //setCardid(cardida)
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit} id="modal-add-card-bg-fix" style={{width:"320px", backgroundColor:"grey",padding:"20px", borderRadius: "7px"}}>
      
      {/*
      <div className='form-control'>
        
        <label style={{padding:"2px", color:"white", fontFamily:"Arial"}}>Deck Name</label>
        <input
          type='text'
          placeholder='Deck Name'
          value={name}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      */}

      <label style={{padding:"2px", color:"white", fontFamily:"Arial"}}>Decks</label>
      {items.map(item => (
      <div key={item.id} className='form-control' style={{padding:"2px", color:"white", fontFamily:"Arial"}}>
        
        <label>{item.name}</label>
        <input type="radio" value={item.name}   onChange={(e) => setText(e.target.value)} name="name" required="required"/> 

      </div>
      ))}
      <div className='form-control' style={{padding:"2px", color:"white", fontFamily:"Arial"}}>
        <label>Rebel</label>
        <input type="radio" value="Rebel"   onChange={(e) => setFaction(e.target.value)} name="faction" required="required"/> 
        <label>Jedi</label>
        <input type="radio" value="Jedi"    onChange={(e) => setFaction(e.target.value)} name="faction"/>
        <label>Empire</label>
        <input type="radio" value="Empire"  onChange={(e) => setFaction(e.target.value)} name="faction"/>
        <label>None</label>
        <input type="radio" value="None"    onChange={(e) => setFaction(e.target.value)} name="faction"/>
      </div>

      <div className='form-control'>
        <label style={{padding:"2px", color:"white", fontFamily:"Arial"}}>CardID</label>
        <input
          type='number'
          placeholder={cardida}
          value={cardida}
          onChange={(e) => setCardid(e.target.value)}
        />
      </div>

      <div className='form-control form-control-check' style={{visibility:"hidden"}}>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input style={{padding:"12px", color:"black", fontFamily:"Arial"}} type='submit' value='Save Card' className='btn btn-block' />
    </form>
  )
}

export default Addcard
