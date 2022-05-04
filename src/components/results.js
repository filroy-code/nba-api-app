import React from "react"
import PlayerStats from './playerStats'

export default function Results(props) {

    let oldestSeason = 1970
    let seasonArray = [];
    for (let i = oldestSeason; i <= 2021; i++) {
        seasonArray.push(i)
    }

    let seasonDropdown = seasonArray.map(x => {
        if (x === 2021) {
            return <option value={x} key={x} defaultValue={x}>{x}-{x+1}</option>} else {
            return <option value={x} key={x}>{x}-{x+1}</option>}
    })

    const [selectedPlayer, selectedPlayerUpdate] = React.useState({id: "", name: ""})
    const [selectedYear, selectedYearUpdate] = React.useState()

    const [submitted, toggleSubmitted] = React.useState(false)

    function selectPlayer(event) {
        selectedPlayerUpdate({id: event.target.value, name: event.target.alt})
        updatePlayerOne({...playerOne, player: selectedPlayer.name})
    }

    function selectYear(event) {
        selectedYearUpdate(event.target.value)
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

    async function findPlayerStats(selectedPlayer, selectedYear) {
        //event.preventDefault();
        let response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${selectedPlayer.id}&season=${selectedYear}`)
        let stats = await response.json();
        console.log(stats.data[0].games_played)
        updatePlayerOne({
            player: selectedPlayer.name,
            season: stats.data[0].season,
            games_played: stats.data[0].games_played,
            mins: stats.data[0].min,
            pts: stats.data[0].pts,
            reb: stats.data[0].reb,
            ast: stats.data[0].ast,
            blk: stats.data[0].blk,
            stl: stats.data[0].stl,
            tov: stats.data[0].turnover,
            fouls: stats.data[0].pf,
            fga: stats.data[0].fga,
            fgm: stats.data[0].fgm,
            fgp: stats.data[0].fg_pct,
            oreb: stats.data[0].oreb,
            fta: stats.data[0].fta,
            ftm: stats.data[0].ftm,
            ftp: stats.data[0].ft_pct,
            fg3a: stats.data[0].fg3a,
            fg3m: stats.data[0].fg3m,
            fg3p: stats.data[0].fg3_pct,
        })
        toggleSubmitted(true)
    }

    const playersList = props.searchedPlayers.map(x => 
        <div key={x.id}>
            <input 
                type="radio"
                name="playerChoose"
                onChange={selectPlayer}
                value={x.id}
                alt={`${x.first_name} ${x.last_name}`}>
            </input>
            <label>
                {`${x.first_name} ` + x.last_name}
            </label>
        </div>)

    return <div className="results">
        <form className="searchResults">
            <label htmlFor="year">Season: </label>
            <select 
                name="year"
                onChange={selectYear}>
                {seasonDropdown}
            </select>
            <br></br><br></br>
            {playersList}
            <b className="disclaimer">Search results are limited to 5 players.</b>
        </form>
        <br></br>
        <button onClick={() => {findPlayerStats(selectedPlayer, selectedYear)}}>Find Player Stats</button>
        {submitted ? <PlayerStats playerOne={playerOne} /> : null}
    </div>
    }