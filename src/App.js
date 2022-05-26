import './App.css';
import findListofPlayers from './components/findListofPlayers'
import findPlayerStats from './components/findPlayerStats';
import Inputs from './components/inputs';
import Results from './components/results';
import PlayerStats  from "./components/playerStats"
import BarChart from "./components/BarChart"
import React from 'react'
import Logo from './images/nbalogo.png'


function App() {

  const isMounted = React.useRef(false);
  const isMounted2 = React.useRef(false);

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
    for await (let playerResult of playersArray) {
      let entry = await fetch(`https://www.balldontlie.io/api/v1/players/${playerResult}`)
      let result = await entry.json()
      currentSearch.push(result)
    }
    toggleSubmitted(true)
    updateSearchedPlayers(currentSearch)
  }

  async function submitHandler2(event) {
    event.preventDefault()
    let currentSearch = [];
    const playersArray = await (findListofPlayers(searchParams2))
    for await (let playerResult of playersArray) {
      let entry = await fetch(`https://www.balldontlie.io/api/v1/players/${playerResult}`)
      let result = await entry.json()
      currentSearch.push(result)
    }
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

React.useEffect(() => {
  if (isMounted.current) {
  findPlayerStats(selectedPlayerOne, selectedYearOne).then((res) => updatePlayerOne(res))} else {
    isMounted.current = true
  }
  }, [selectedPlayerOne, selectedYearOne])

  async function selectPlayerOne(event) {
      selectedPlayerOneUpdate({id: event.target.value, name: event.target.alt})
      togglePlayerOneFind(true)
  }

  //choosing second player to compare
  const [selectedPlayerTwo, selectedPlayerTwoUpdate] = React.useState({id: "", name: ""})
  const [playerTwoFind, togglePlayerTwoFind] = React.useState(false)

  React.useEffect(() => {
    if (isMounted2.current) {
    findPlayerStats(selectedPlayerTwo, selectedYearTwo).then((res) => updatePlayerTwo(res))} else {
      isMounted2.current = true
    }
    }, [selectedPlayerTwo, selectedYearTwo])
  

  async function selectPlayerTwo(event) {
    selectedPlayerTwoUpdate({id: event.target.value, name: event.target.alt})
    togglePlayerTwoFind(true)
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

  function playerComparisonObjectCreate(playerOne, playerTwo) {
    return (
      [{stat: "games_played", "comparison": (playerTwo.games_played - playerOne.games_played), playerOne: playerOne.games_played, playerTwo: playerTwo.games_played},
      {stat: "pts", "comparison": (playerTwo.pts - playerOne.pts), playerOne: playerOne.pts, playerTwo: playerTwo.pts},
      {stat: "reb", "comparison": (playerTwo.reb - playerOne.reb), playerOne: playerOne.reb, playerTwo: playerTwo.reb},
      {stat: "ast", "comparison": (playerTwo.ast - playerOne.ast), playerOne: playerOne.ast, playerTwo: playerTwo.ast},
      {stat: "blk", "comparison": (playerTwo.blk - playerOne.blk), playerOne: playerOne.blk, playerTwo: playerTwo.blk},
      {stat: "stl", "comparison": (playerTwo.stl - playerOne.stl), playerOne: playerOne.stl, playerTwo: playerTwo.stl},
      {stat: "tov", "comparison": (playerTwo.tov - playerOne.tov), playerOne: playerOne.tov, playerTwo: playerTwo.tov},
      {stat: "fouls", "comparison": (playerTwo.fouls - playerOne.fouls), playerOne: playerOne.fouls, playerTwo: playerTwo.fouls},
      {stat: "fga", "comparison": (playerTwo.fga - playerOne.fga), playerOne: playerOne.fga, playerTwo: playerTwo.fga},
      {stat: "fgm", "comparison": (playerTwo.fgm - playerOne.fgm), playerOne: playerOne.fgm, playerTwo: playerTwo.fgm},
      {stat: "fgp", "comparison": (playerTwo.fgp - playerOne.fgp), playerOne: playerOne.fgp, playerTwo: playerTwo.fgp},
      {stat: "oreb", "comparison": (playerTwo.oreb - playerOne.oreb), playerOne: playerOne.oreb, playerTwo: playerTwo.oreb},
      {stat: "fta", "comparison": (playerTwo.fta - playerOne.fta), playerOne: playerOne.fta, playerTwo: playerTwo.fta},
      {stat: "ftm", "comparison": (playerTwo.ftm - playerOne.ftm), playerOne: playerOne.ftm, playerTwo: playerTwo.ftm},
      {stat: "ftp", "comparison": (playerTwo.ftp - playerOne.ftp), playerOne: playerOne.ftp, playerTwo: playerTwo.ftp},
      {stat: "fg3a", "comparison": (playerTwo.fg3a - playerOne.fg3a), playerOne: playerOne.fg3a, playerTwo: playerTwo.fg3a},
      {stat: "fg3m", "comparison": (playerTwo.fg3m - playerOne.fg3m), playerOne: playerOne.fg3m, playerTwo: playerTwo.fg3m},
      {stat: "fg3p", "comparison": (playerTwo.fg3p - playerOne.fg3p), playerOne: playerOne.fg3p, playerTwo: playerTwo.fg3p},
      ]
    )
  }
const [graphMake, updateGraphMake] = React.useState(false)

  React.useEffect(() => {
    setPlayersToCompare([playerOne, playerTwo]);
    setComparisonStats(playerComparisonObjectCreate(playerOne, playerTwo))}, [playerOne, playerTwo])
  
  React.useEffect((playersToCompare) => {if (playerOneFind && playerTwoFind) {updateGraphMake(true)}}, [playerOneFind, playerTwoFind, comparisonStats])
 

  return (
    <div className="App">
      {/*<button onClick={() => {console.log(comparisonStats)}}>Click me!</button>*/}
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
      <div className='queryContainer'>
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
      {submitted || submitted2 ? <hr></hr> : null}
      <div className='resultsContainer'>
        {graphMake === false ? (playerOneFind ? <PlayerStats player={playerOne} /> : <div className='playerStats' />) : <div className='playerStats' />}
        <div>
        {graphMake === true ? <BarChart compare={comparisonStats} /> : null}
        </div>
        {graphMake === false ? (playerTwoFind ? <PlayerStats player={playerTwo} /> : <div className='playerStats' />) : <div className='playerStats' />}
      </div>
    </div>
  );
}

export default App;
