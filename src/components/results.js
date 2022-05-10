import React from "react"

export default function Results(props) {

    let oldestSeason = 1970
    let currentSeason = 2021
    let seasonArray = [];
    for (let i = oldestSeason; i <= currentSeason; i++) {
        seasonArray.push(i)
    }

    let seasonDropdown = seasonArray.map(x => {
            return <option value={x} key={x}>{x}-{x+1}</option>
    })

    const playersList = props.searchedPlayers.map(x => 
        <div key={x.id}>
            <input 
                type="radio"
                name="playerChoose"
                onChange={props.selectPlayer}
                value={x.id}
                alt={`${x.first_name} ${x.last_name}`}>
            </input>
            <label>
                {`${x.first_name} ` + x.last_name}
            </label>
        </div>)

    return <div className="results">
        <form onSubmit={props.selectPlayer} className="searchResults">
            <label htmlFor="year">Season: </label>
            <select 
                name="year"
                defaultValue={currentSeason}
                onChange={props.selectYear}>
                {seasonDropdown}
            </select>
            <br></br><br></br>
            <div className="playerList">
                <div>
                    {playersList}
                </div>
            </div>
        </form>
        <br></br>
        <div className="disclaimer"><b>Search results are limited to 5 players.</b></div>
        <button onClick={props.selectPlayer}>Find Player Stats</button>
    </div>
    }