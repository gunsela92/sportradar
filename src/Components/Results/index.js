import React, {useState} from 'react';

const GameResults = ({gameList, deleteGame, updateGame}) => {
  const [updatingGameId, setUpdatingGameId] = useState(-1);
  const [updatedResults, setUpdatedResults] = useState({"homeScore": 0, "awayScore": 0});

  const orderedGameList = gameList.sort((a, b) => { // sort games by total score, if scores are equal sort by id
    if (a.homeScore + a.awayScore === b.homeScore + b.awayScore) {
      return a.id - b.id;
    }
    return b.homeScore + b.awayScore - a.homeScore - a.awayScore;
  })

  const handleUpdateClick = (gameData) => { // set the updatingGameId and find the game from gamelist. Then save the game scores to the updatedResults state
    setUpdatingGameId(gameData.id);
    const game = gameList.find(game => game.id === gameData.id);
    setUpdatedResults({
      "homeScore": game.homeScore,
      "awayScore": game.awayScore
    })
  }

  const handleSave = (game) => { // save the updated game to the game list and reset the updatingGameId
    const updatedGame = {
      ...game,
      homeScore: parseInt(updatedResults.homeScore),
      awayScore: parseInt(updatedResults.awayScore)
    }
    updateGame(game.id, updatedGame);
    setUpdatingGameId(-1);
  }

  return (
    <div className={"gameResultsSection"}>
      <h3>Scoreboard</h3>
      {orderedGameList.length > 0 && orderedGameList.map(game => (
        <div key={game.id} className={"gameResult"}>
          <div>
            <span>{game.home}</span>
            {updatingGameId === game.id && (
              <span>
                <input className={"editScoreInput"} type={"number"} value={updatedResults.homeScore} onChange={(e) => setUpdatedResults({...updatedResults, "homeScore": e.target.value})} />
                <span> - </span>
                <input className={"editScoreInput"} type={"number"} value={updatedResults.awayScore} onChange={(e) => setUpdatedResults({...updatedResults, "awayScore": e.target.value})} />
              </span>
            )}
            {updatingGameId !== game.id && (
            <span>{game.homeScore} - {game.awayScore}</span>
            )}
            <span>{game.away}</span>
          </div>
          <div>
            {updatingGameId === game.id && (
              <button className={"updateButton"} onClick={() => handleSave(game)}>Save</button>
            )}
            {updatingGameId === -1 && (
              <button className={"updateButton"} onClick={() => handleUpdateClick(game)}>Update</button>
            )}
            <button className={"deleteButton"} onClick={() => deleteGame(game.id)}>Delete</button>
          </div>
        </div>
      ))}
      {orderedGameList.length === 0 && (
        <h4>
          No games started yet
        </h4>
      )}
    </div>
  );
};

export default GameResults;
