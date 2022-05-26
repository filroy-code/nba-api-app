import React from "react"

export default function Results(props) {

    let playerButtons
    const [playerList, setPlayerList] = React.useState([])
    React.useEffect(() => setPlayerList(props.searchedPlayers), [props.searchedPlayers])

    let oldestSeason = 2000
    let currentSeason = 2021
    let seasonArray = [];
    for (let i = oldestSeason; i <= currentSeason; i++) {
        seasonArray.push(i)
    }

    let seasonDropdown = seasonArray.map(x => {
            return <option value={x} key={x}>{x}-{x+1}</option>
    })
    if (playerList.length < 1) {playerButtons = "No players found."} else {
    playerButtons = playerList.map(x => 
        <div key={x.id}>
            <input 
                type="radio"
                name="playerChoose"
                onChange={props.selectPlayer}
                id={x.id}
                value={x.id}
                alt={`${x.first_name} ${x.last_name}`}>
            </input>
            <label htmlFor={x.id}>
                {`${x.first_name} ` + x.last_name}
            </label>
        </div>)}

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
                    {playerButtons}
                </div>
            </div>
        </form>
        <br></br>
    </div>
    }