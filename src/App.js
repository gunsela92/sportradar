import './App.css';
import GameCreator from "./Components/GameCreator";
import GameResults from "./Components/Results";
import {useEffect, useState} from "react";

function App() {
  const [gameList, setGameList] = useState([]);
  const [showError, setShowError] = useState(false);

  const loadFromLocalStorage = () => { // load the game list from local storage
    const savedGameList = JSON.parse(localStorage.getItem("gameList"));
    if (savedGameList) {
      setGameList(savedGameList);
    }
  }

  useEffect(() => { // call the loadFromLocalStorage function when the app loads
    loadFromLocalStorage();
  }, []);

  const addGame = (game) => { // add the new game to the game list
    const games = gameList.find(item => item.home === game.home || item.away === game.away || item.home === game.away || item.away === game.home);
    if (!game.home || !game.away || games) {
      setShowError(true);
      return;
    }
    if (gameList.length === 0) {
      game.id = 1;
    } else {
      const maxId = Math.max(...gameList.map(game => game.id));
      game.id = maxId + 1;
    }
    const gameData = {
      ...game,
      homeScore: 0,
      awayScore: 0
    }
    const newGameList = [...gameList, gameData];
    setGameList(newGameList);
    saveToLocalStorage(newGameList);
  }

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [showError]);


  const deleteGame = (id) => { // delete & remove the game from the game list
    const newGameList = gameList.filter((game) => game.id !== id);
    setGameList(newGameList);
    saveToLocalStorage(newGameList);
  }

  const updateGame = (id, updatedGame) => { // find the game in the gameList state then update it
    const newGameList = gameList.map((game) => {
      if (game.id === id) {
        return updatedGame;
      }
      return game;
    });
    setGameList(newGameList);
    saveToLocalStorage(newGameList);
  };

  const saveToLocalStorage = (gameData) => { // save the game list to local storage
    localStorage.setItem("gameList", JSON.stringify(gameData));
  }

  return (
    <div className="App">
      {showError && (
        <p className={"error"}>Game already exists or missing home or away team</p>
      )}
      <GameCreator addGame={addGame} />
      <GameResults gameList={gameList} deleteGame={deleteGame} updateGame={updateGame} />
    </div>
  );
}

export default App;
