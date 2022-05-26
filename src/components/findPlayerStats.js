export default async function findPlayerStats(selectedPlayer, selectedYear) {
    //event.preventDefault();
    let response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${selectedPlayer.id}&season=${selectedYear}`)
    let stats = await response.json();
    if (stats.data[0]) {return ({
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
    })} else {return "No player data found for this year."}
}