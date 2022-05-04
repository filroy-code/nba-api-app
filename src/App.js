import './App.css';
import Inputs from './components/inputs';
import Results from './components/results';
import React from 'react'


function App() {

  document.title = "NBA Stats Comparison Tool"

  const [submitted, toggleSubmitted] = React.useState(false)

  const [searchedPlayers, updateSearchedPlayers] = React.useState([])
  const [searchedPlayers2, updateSearchedPlayers2] = React.useState([])

  async function submitHandler(event) {
    event.preventDefault()
    let currentSearch = [];
    const playersArray = await (findStats())
    playersArray.forEach( async (player) => 
        {let entry = await fetch(`https://www.balldontlie.io/api/v1/players/${player}`)
        let result = await entry.json();
        currentSearch.push(result)
        })
    toggleSubmitted(true)
    updateSearchedPlayers(currentSearch)
    changeHandler(event)
  }

  async function submitHandler2(event) {
    event.preventDefault()
    let currentSearch = [];
    const playersArray = await (findStats2())
    playersArray.forEach( async (player) => 
        {let entry = await fetch(`https://www.balldontlie.io/api/v1/players/${player}`)
        let result = await entry.json();
        currentSearch.push(result)
        })
    toggleSubmitted(true)
    updateSearchedPlayers2(currentSearch)
    changeHandler2(event)
  }

  function changeHandler(event) {
    const {name, value} = event.target;
    setSearchParams(prevStatus => {
      return ({...prevStatus, [name]: value})
    })
  }

  function changeHandler2(event) {
    const {name, value} = event.target;
    setSearchParams2(prevStatus => {
      return ({...prevStatus, [name]: value})
    })
  }

  const [searchParams, setSearchParams] = React.useState({
    //searchType: 0,
    searchQuery: ""
  });

  const [searchParams2, setSearchParams2] = React.useState({
    //searchType: 0,
    searchQuery: ""
  });

  async function findStats() {
    let playerCall = await fetch(`https://www.balldontlie.io/api/v1/players?search=${searchParams.searchQuery}&per_page=5`)
    let playersList = await playerCall.json();
    let playersArray = []
    for (let i = 0; i < playersList.data.length; i++) {
      playersArray.push(playersList.data[i].id)}
    return playersArray
  }

  async function findStats2() {
    let playerCall = await fetch(`https://www.balldontlie.io/api/v1/players?search=${searchParams2.searchQuery}&per_page=5`)
    let playersList = await playerCall.json();
    let playersArray = []
    for (let i = 0; i < playersList.data.length; i++) {
      playersArray.push(playersList.data[i].id)}
    return playersArray
  }
 
  return (
    <div className="App">
      <h1>NBA Stats Comparison Tool</h1>
      <div className='inputsContainer'>
        <Inputs 
          submitHandler={submitHandler}
          searchParams={searchParams}
          changeHandler={changeHandler}
        />
        <Inputs 
          submitHandler={submitHandler2}
          searchParams={searchParams2}
          changeHandler={changeHandler2}
        />
      </div>
      <div className='resultsContainer'>
        {submitted ? <Results 
          searchedPlayers={searchedPlayers}/> : null}
        {submitted ? <Results 
          searchedPlayers={searchedPlayers2}/> : null}
      </div>
    </div>
  );
}

export default App;
