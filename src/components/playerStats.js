import React from "react"

export default function PlayerStats(props) {

    let playerStatsArray = []
    for (let key in props.player) {
        playerStatsArray.push(`${key}: ${props.player[key]}`)
    }

    let playerStatsDisplay = playerStatsArray.map(x => <p key={x}>{x}</p>)

    if (playerStatsDisplay[0].key === "0: N") {playerStatsDisplay = "No player data found for this year."}

    return (
        <div className="playerStats">
            {playerStatsDisplay}
        </div>
    )
}