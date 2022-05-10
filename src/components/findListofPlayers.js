export default async function findListofPlayers(searchParams) {
    let playerCall = await fetch(`https://www.balldontlie.io/api/v1/players?search=${searchParams}&per_page=5`)
    let playersList = await playerCall.json();
    let playersArray = []
    for (let i = 0; i < playersList.data.length; i++) {
      playersArray.push(playersList.data[i].id)}
    return playersArray
  }