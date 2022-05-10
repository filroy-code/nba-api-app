import React from "react"

export default function PlayerStats(props) {

    let playerStatsArray = []
    for (let key in props.player) {
        playerStatsArray.push(`${key}: ${props.player[key]}`)
    }

    let playerStatsDisplay = playerStatsArray.map(x => <p key={x}>{x}</p>)

    return (
        <div className="playerStats">
            {playerStatsDisplay}
        </div>
    )
}