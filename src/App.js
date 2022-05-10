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

const [comparisonStats, setComparisonStats] = React.useState({
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

function playerComparisonGreaterThan(comparisonStats, playerOne, playerTwo) {
  let comparisonArray = {}
  for (let stat in comparisonStats) {
    if (comparisonStats[stat] > 0) {
      comparisonArray[stat] = playerTwo[stat]}
    else {comparisonArray[stat] = playerOne[stat]}
  }
  return (comparisonArray)
}

function calculateGraphBars(comparisonArray, comparisonStats) {
  let graphValues = {};
  for (let stat in comparisonStats) {
    graphValues[stat] = (comparisonStats[stat] / comparisonArray[stat])
  }
  console.log(graphValues)
  return graphValues
}


function playerComparisonObjectCreate(playerOne, playerTwo) {
  return (
    {games_played: (playerTwo.games_played - playerOne.games_played),
    pts: (playerTwo.pts - playerOne.pts),
    reb: (playerTwo.reb - playerOne.reb),
    ast: (playerTwo.ast - playerOne.ast),
    blk: (playerTwo.blk - playerOne.blk),
    stl: (playerTwo.stl - playerOne.stl),
    tov: (playerTwo.tov - playerOne.tov),
    fouls: (playerTwo.fouls - playerOne.fouls),
    fga: (playerTwo.fga - playerOne.fga),
    fgm: (playerTwo.fgm - playerOne.fgm),
    fgp: (playerTwo.fgp - playerOne.fgp),
    oreb: (playerTwo.oreb - playerOne.oreb),
    fta: (playerTwo.fta - playerOne.fta),
    ftm: (playerTwo.ftm - playerOne.ftm),
    ftp: (playerTwo.ftp - playerOne.ftp),
    fg3a: (playerTwo.fg3a - playerOne.fg3a),
    fg3m: (playerTwo.fg3m - playerOne.fg3m),
    fg3p: (playerTwo.fg3p - playerOne.fg3p),
    }
  )
}

React.useEffect(() => {
  setPlayersToCompare([playerOne, playerTwo]);
  setComparisonStats(playerComparisonObjectCreate(playerOne, playerTwo))}, [playerOne, playerTwo])
 


  return (
    <div className="App">
      <h1>NBA Stats Comparison Tool</h1>
      <button onClick={() => calculateGraphBars(playerComparisonGreaterThan(comparisonStats, playerOne, playerTwo), comparisonStats)}>Show Saved Players</button>
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
          submitted={playerOneFind}/> : <div className='results' />}
        {submitted2 ? <Results 
          searchedPlayers={searchedPlayers2}
          selectPlayer={selectPlayerTwo}
          selectYear={selectYearTwo}
          player={playerTwo}
          submitted={playerTwoFind}/> : <div className='results' />}
      </div>
      <div className='resultsContainer'>
        {playerOneFind ? <PlayerStats player={playerOne} /> : <div className='playerStats' />}
        {playerTwoFind ? <PlayerStats player={playerTwo} /> : <div className='playerStats' />}
      </div>
      <div className='graph'>
        {JSON.stringify(comparisonStats)}
      </div>
    </div>
  );
}

export default App;
