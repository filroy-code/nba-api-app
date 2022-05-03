import './App.css';
import Inputs from './components/inputs';
import Results from './components/results';
import React from 'react'


function App() {

  document.title = "NBA Stats Comparison Tool"

  const [submitted, toggleSubmitted] = React.useState(false)

  const [searchedPlayers, updateSearchedPlayers] = React.useState([])

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
    //let players = playersArray.map(x => `player_ids[]=${x}`)
    //let listOfPlayers = players.join('&')
    //let apiQuery = await fetch(`https://www.balldontlie.io/api/v1/season_averages?${listOfPlayers}`)
    //let results = await apiQuery.json();
    //console.log(results)
    console.log(searchedPlayers)
  }

  function changeHandler(event) {
    const {name, value} = event.target;
    setSearchParams(prevStatus => {
      return ({...prevStatus, [name]: value})
    })
  }

  // function playerSelectChangeHandler(event) {
  //   console.log(event.target.value)
  // }

  async function findStats() {
    let playerCall = await fetch(`https://www.balldontlie.io/api/v1/players?search=${searchParams.searchQuery}`)
    let playersList = await playerCall.json();
    let playersArray = []
    for (let i = 0; i < playersList.data.length; i++) {
      playersArray.push(playersList.data[i].id)}
    return playersArray
  }

  const [searchParams, setSearchParams] = React.useState({
    //searchType: 0,
    searchQuery: ""
  });

  // React.useEffect(() => {})
 
  return (
    <div className="App">
      <h1>NBA Stats Comparison Tool</h1>
      <Inputs 
        submitHandler={submitHandler}
        searchParams={searchParams}
        changeHandler={changeHandler}
      />
      {submitted ? <Results 
        searchedPlayers={searchedPlayers}/> : null}
    </div>
  );
}

export default App;
