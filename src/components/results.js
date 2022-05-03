import React from "react"

export default function Results(props) {

    let oldestSeason = 1970
    let seasonArray = [];
    for (let i = oldestSeason; i <= 2022; i++) {
        seasonArray.push(i)
    }

    let seasonDropdown = seasonArray.map(x => {
        return <option value={x} key={x}>{x}-{x+1}</option>
    })
    /*
    let seasonDropdown = oldestSeason.map(x => {
        <option value="1970">1970-1971</option>
    }) 
    */

    const [selectedPlayer, selectedPlayerUpdate] = React.useState()
    const [selectedYear, selectedYearUpdate] = React.useState()

    function selectPlayer(event) {
        selectedPlayerUpdate(event.target.value)
        console.log(selectedPlayer)
    }

    function selectYear(event) {
        selectedYearUpdate(event.target.value)
        console.log(selectedYear)
    }

    async function findPlayerStats(selectedPlayer, selectedYear) {
        //event.preventDefault();
        let response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${selectedPlayer}&season=${selectedYear}`)
        let stats = await response.json();
        console.log(stats)
    }

    const playersList = props.searchedPlayers.map(x => 
        <div key={x.id}>
            <input 
                type="radio"
                name="playerChoose"
                onChange={selectPlayer}
                value={x.id}>
            </input>
            <label>
                {`${x.first_name} ` + x.last_name}
            </label>
        </div>)

    return <div className="results">
        <form>
            <label htmlFor="year">Season: </label>
            <select 
                name="year"
                onChange={selectYear}>
                {seasonDropdown}
            </select>
            <br></br><br></br>
            {playersList}
        </form>
        <br></br>
        <button onClick={() => {findPlayerStats(selectedPlayer, selectedYear)}}>Find Player Stats</button>
    </div>
    }