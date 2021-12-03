import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Search from './Search'

/* 
    <Search/>

*/

import Deck from './Deck'

import Addcard from './components/Addcard'

import Adddeck from './components/Adddeck'

import Person from './components/Person'

const App = () => {


  const [pagecount, setPageCount] = useState(1);

  const page1 = [1,2,3,4,5,6,7,8,9]
  //17
  const page2 = [10,11,12,13,14,15,16,18,19]
  const page3 = [20,21,22,23,24,25,26,27,28,29]
  const page4 = [30,31,32,33,34,35,36,37,38,39]
  const page5 = [40,41,42,43,44,45,46,47,48,49]
  const page6 = [50,51,52,53,54,55,56,57,58,59]
  const page7 = [60,61,62,63,64,65,66,67,68,69]
  const page8 = [70,71,72,73,74,75,76,77,78,79]
  const page9 =[80,81,82,83]

  const [pageall, setPageAll] = useState([...page1])

  const [singlecard, setSingleCard] = useState()

  const [showAddcard, setShowAddcard] = useState(false)
  const [showAdddeck, setShowAdddeck] = useState(false)
  //const [people, setPeople] = useState([])
  const [cards, setcards] = useState([])

  const handleIncrease = () => {
    if(pagecount<=9){
      console.log(pagecount)
    setPageCount(pagecount + 1)
    }
  }

  const handleDecrease = () => {
    if(pagecount>=1){
    setPageCount(pagecount - 1)
    }
  }
  
  const sendSingleCard = (idc) =>{
    setSingleCard(idc);
  }

  useEffect(() => {
    const getPages = (pagecount) =>{
      if(pagecount == 1 ){
        setPageAll([...page1])
      } else if(pagecount == 2 ) {
        setPageAll([...page1, ...page2])
      } else if(pagecount == 3 ) {
        setPageAll([...page1, ...page2, ...page3])
      } else if(pagecount == 4 ) {
        setPageAll([...page1, ...page2, ...page3, ...page4])
      } else if(pagecount == 5 ) {
        setPageAll([...page1, ...page2, ...page3, ...page4, ...page5])
      } else if(pagecount == 6 ) {
        setPageAll([...page1, ...page2, ...page3, ...page4, ...page5, ...page6])
      } else if(pagecount == 7 ) { 
        setPageAll([...page1, ...page2], ...page3, ...page4, ...page5, ...page6, ...page7)
      } else if(pagecount == 8 ) {  
        setPageAll([...page1, ...page2], ...page3, ...page4, ...page5, ...page6, ...page7, ...page8)
      } else if(pagecount == 9 ) {
        setPageAll([...page1, ...page2], ...page3, ...page4, ...page5, ...page6, ...page7, ...page8, ...page9)
      }
    }
    
    getPages(pagecount)

  }, [pagecount])

  useEffect(() => {

    /*
    const getcards = async () => {
      const cardsFromServer = await fetchcards()
      setcards(cardsFromServer)
    }

    getcards()
    */
  }, [])

  // Fetch cards
  const fetchcards = async () => {
    const res = await fetch('http://localhost:5000/cards')
    const data = await res.json()

    return data
  }

  // Fetch card
  const fetchcard = async (id) => {
    const res = await fetch(`http://localhost:5000/cards/${id}`)
    const data = await res.json()

    return data
  }


  // Add card
  const addcard = async (card) => {
    //const res = await fetch('http://localhost:5000/deckscreate', {
    const res = await fetch('http://localhost:5000/addcardtodecks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(card),
    })

    const data = await res.json()

    setcards([...cards, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newcard = { id, ...card }
    // setcards([...cards, newcard])
  }

    // Add card
    const adddeck = async (card) => {
      const res = await fetch('http://localhost:5000/deckscreate', {
      //const res = await fetch('http://localhost:5000/deckscreate', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(card),
      })
  
      const data = await res.json()
  
      setcards([...cards, data])
  
      // const id = Math.floor(Math.random() * 10000) + 1
      // const newcard = { id, ...card }
      // setcards([...cards, newcard])
    }
  // Delete card
  const deletecard = async (id) => {
    const res = await fetch(`http://localhost:5000/cards/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setcards(cards.filter((card) => card.id !== id))
      : alert('Error Deleting This card')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const cardToToggle = await fetchcard(id)
    const updcard = { ...cardToToggle, reminder: !cardToToggle.reminder }

    const res = await fetch(`http://localhost:5000/cards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updcard),
    })

    const data = await res.json()

    setcards(
      cards.map((card) =>
        card.id === id ? { ...card, reminder: data.reminder } : card
      )
    )
  }


  return (
      <Router>
      <Switch>

      <Route path="/deck">

      <div id="modal-add-deck">
            {showAdddeck && <Adddeck onAdd={adddeck} />}
          </div>

  <div className="all-content">
        
        <div className="panel-1">
  
          <Link to ='/'>
          <div className="button button-1" style={{ textDecoration: 'none' }}>
            <img className="icon" src="img/Card.svg" />
            <div className="roboto-normal-onyx-16px text">All Cards</div>
          </div> 
          </Link>
          
          <Link to ='/deck'>
          <div className="button button-2">
            <img className="icon" src="img/Deck.svg" />
            <div className="roboto-normal-onyx-16px text">Decks</div>
          </div> 
          </Link>
          
          <div className="main-title">
            <div className="color2">SW-API Deck Builder</div>
          </div> 
  
          <div className="button button-3">
  
            <div className="roboto-normal-onyx-16px text callbackname-notes "></div>
          </div>
  
        </div>
        
        <div className="seperator-1">
        </div>
  
  
        <div className="breadcrumb">
          <div className="text-abc-1 roboto-normal-sonic-silver-16px" >Deck</div>
          <img className="icon-abc-1" src="img/breadcumb-temp@2x.svg"/>
          <div className="text-abc-2 roboto-normal-mountain-mist-16px">Select a Deck</div>
          <button style={{marginLeft:"900px"}} onClick={() => { setShowAdddeck(!showAdddeck)}}>+</button>
        </div>      
  
        <div className="flex-container-a1">
  
              <form className="search flex-item-left-a1">
                <input className="search-text-1 roboto-normal-pink-swan-16px" type="text" id="search" name="search" value="Search" />
                <img className="icons" src="img/Search.svg"/>
              </form>
  
  
              <div className="sort roboto-normal-onyx-16px flex-item-right-a1" style={{display:"none"}}>
                <div className="text-1">Sort by</div>
                
                <form className="sort-form">
  
                  <select className="card-filter border-1px-pink-swan" id="cars" name="cars">
                    <option value="Homeworld">Homeworld</option>
                  </select>
  
                </form>
  
                <div className="card-filter-buts">
                  {/*<img onClick={ascorder} className="label-sort-by-img-1" src="img/asc@2x.svg" />*/}
                  {/*<img onClick={dscorder} className="label-sort-by-img-2" src="img/desc@2x.svg" />*/} 
                </div>
              </div>
  
        </div>
        

        <div className="frame-abc-1">
                  <Deck />
        </div>
                  
        

  </div>


      </Route>

      <Route path='/' exact>

      <div id="modal-add-card">
            {showAddcard && <Addcard cardida={singlecard} onAdd={addcard} />}
          </div>

    <div className="all-content">
        
        <div className="panel-1">

          <Link to ='/'>
          <div className="button button-1" style={{ textDecoration: 'none' }}>
            <img className="icon" src="img/Card.svg" />
            <div className="roboto-normal-onyx-16px text">All Cards</div>
          </div> 
          </Link>

          <Link to ='/deck'>
          <div className="button button-2">
            <img className="icon" src="img/Deck.svg" />
            <div className="roboto-normal-onyx-16px text">Decks</div>
          </div> 
          </Link>

          <div className="main-title">
            <div className="color2">SW-API Deck Builder</div>
          </div> 
  
          <div className="button button-3">
  
            <div className="roboto-normal-onyx-16px text callbackname-notes ">Luke Skywalker</div>
          </div>
  
        </div>
        
        <div className="seperator-1">
        </div>
  
  
        <div className="breadcrumb">
          <div className="text-abc-1 roboto-normal-sonic-silver-16px" >All Cards</div>
          <img className="icon-abc-1" src="img/breadcumb-temp@2x.svg"/>
          <div className="text-abc-2 roboto-normal-mountain-mist-16px">Select a card</div>
        </div>      
  
        <div className="flex-container-a1">
  
              <form className="search flex-item-left-a1">
                <input className="search-text-1 roboto-normal-pink-swan-16px" type="text" id="search" name="search" value="Search" />
                <img className="icons" src="img/Search.svg"/>
              </form>
  
  
              <div className="sort roboto-normal-onyx-16px flex-item-right-a1" style={{display:"none"}}>
                <div className="text-1">Sort by</div>
                
                <form className="sort-form">
  
                  <select className="card-filter border-1px-pink-swan" id="cars" name="cars">
                    <option value="Homeworld">Homeworld</option>
                  </select>
  
                </form>
  
                <div className="card-filter-buts">
                  {/*<img onClick={ascorder} className="label-sort-by-img-1" src="img/asc@2x.svg" />*/}
                  {/*<img onClick={dscorder} className="label-sort-by-img-2" src="img/desc@2x.svg" />*/} 
                </div>
              </div>
  
        </div>

        <div className="frame-abc-1">
        {pageall.map((index) => (
                <Person key={index} ida = {index} onAdd={() => { setShowAddcard(!showAddcard); sendSingleCard(index); }} />
                ))}
        </div>


        <button className="fixedElement" onClick={handleIncrease}>Load More</button>
    </div>
      </Route>
      </Switch>
  
      </Router>
  
    )
  }
  
  export default App
