import './App.css';
import findListofPlayers from './components/findListofPlayers'
import findPlayerStats from './components/findPlayerStats';
import Inputs from './components/inputs';
import Results from './components/results';
import PlayerStats  from "./components/playerStats"
// import BarChart from "./components/BarChart"
import React from 'react'


function App() {

  document.title = "NBA Stats Comparison Tool"

  const [submitted, toggleSubmitted] = React.useState(false)
  const [submitted2, toggleSubmitted2] = React.useState(false)

  const [searchedPlayers, updateSearchedPlayers] = React.useState([])
  const [searchedPlayers2, updateSearchedPlayers2] = React.useState([])

  const [playersToCompare, setPlayersToCompare] = React.useState(["", ""])

  async function submitHandler(event) {
    event.preventDefault()
    let currentSearch = [];
    const playersArray = await (findListofPlayers(searchParams))
    playersArray.forEach( async (player) => 
        {let entry = await fetch(`https://www.balldontlie.io/api/v1/players/${player}`)
        let result = await entry.json();
        currentSearch.push(result)
        })
    toggleSubmitted(true)
    updateSearchedPlayers(currentSearch)
    console.log(searchedPlayers)
  }

  async function submitHandler2(event) {
    event.preventDefault()
    let currentSearch = [];
    const playersArray = await (findListofPlayers(searchParams2))
    playersArray.forEach( async (player) => 
        {let entry = await fetch(`https://www.balldontlie.io/api/v1/players/${player}`)
        let result = await entry.json();
        currentSearch.push(result)
        })
    toggleSubmitted2(true)
    updateSearchedPlayers2(currentSearch)
  }

  function changeHandler(event) {
    setSearchParams(event.target.value)
  }

  function changeHandler2(event) {
    setSearchParams2(event.target.value)
  }

  const [searchParams, setSearchParams] = React.useState("");
  const [searchParams2, setSearchParams2] = React.useState("");

  //finding stats for selected player

  let currentSeason = 2021

  const [selectedYearOne, selectedYearOneUpdate] = React.useState(currentSeason)

  function selectYearOne(event) {
    selectedYearOneUpdate(event.target.value)
  }

  const [selectedYearTwo, selectedYearTwoUpdate] = React.useState(currentSeason)

  function selectYearTwo(event) {
    selectedYearTwoUpdate(event.target.value)
  }

  //choosing first player to compare
  const [selectedPlayerOne, selectedPlayerOneUpdate] = React.useState({id: "", name: ""})
  const [playerOneFind, togglePlayerOneFind] = React.useState(false)

  async function selectPlayerOne(event) {
      selectedPlayerOneUpdate({id: event.target.value, name: event.target.alt})
      updatePlayerOne(await findPlayerStats(selectedPlayerOne, selectedYearOne))
      togglePlayerOneFind(true)
      console.log(playerOne)
  }

  //choosing second player to compare
  const [selectedPlayerTwo, selectedPlayerTwoUpdate] = React.useState({id: "", name: ""})
  const [playerTwoFind, togglePlayerTwoFind] = React.useState(false)

  async function selectPlayerTwo(event) {
    selectedPlayerTwoUpdate({id: event.target.value, name: event.target.alt})
    updatePlayerTwo(await findPlayerStats(selectedPlayerTwo, selectedYearTwo))
    togglePlayerTwoFind(true)
    console.log(playerTwo)
  }

  const [playerOne, updatePlayerOne] = React.useState({
    player:"",
    season:0,
    games_played:0,
    mins:"",
    pts:0,
    reb:0,
    ast:0,
    blk:0,
    stl:0,
    tov:0,
    fouls:0,
    fga:0,
    fgm:0,
    fgp:0,
    oreb:0,
    fta:0,
    ftm:0,
    ftp:0,
    fg3a:0,
    fg3m:0,
    fg3p:0,
  })

  const [playerTwo, updatePlayerTwo] = React.useState({
    player:"",
    season:0,
    games_played:0,
    mins:"",
    pts:0,
    reb:0,
    ast:0,
    blk:0,
    stl:0,
    tov:0,
    fouls:0,
    fga:0,
    fgm:0,
    fgp:0,
    oreb:0,
    fta:0,
    ftm:0,
    ftp:0,
    fg3a:0,
    fg3m:0,
    fg3p:0,
})

React.useEffect(() => {setPlayersToCompare([playerOne, playerTwo])}, [playerOne, playerTwo])
 
  return (
    <div className="App">
      <h1>NBA Stats Comparison Tool</h1>
      <button onClick={() => console.log(playersToCompare)}>Show Saved Players</button>
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
          searchedPlayers={searchedPlayers}
          selectPlayer={selectPlayerOne}
          selectYear={selectYearOne}
          player={playerOne}
          submitted={playerOneFind}/> : null}
        {submitted2 ? <Results 
          searchedPlayers={searchedPlayers2}
          selectPlayer={selectPlayerTwo}
          selectYear={selectYearTwo}
          player={playerTwo}
          submitted={playerTwoFind}/> : null}
      </div>
      <div className='resultsContainer'>
        {playerOneFind ? <PlayerStats player={playerOne} /> : null}
        {playerTwoFind ? <PlayerStats player={playerTwo} /> : null}
      </div>
      <div className='graph'>
        
      </div>
    </div>
  );
}

export default App;
