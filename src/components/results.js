import React from "react"

export default function Results(props) {

    const playersList = props.searchedPlayers.map(x => <p key={x.id}>{`${x.first_name} ` + x.last_name}</p>)

    return <div className="results">
        {playersList}
    </div>
    }