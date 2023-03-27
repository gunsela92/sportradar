import React, {useState} from 'react';
import countryList from "../../helpers/countryList";

const GameCreator = ({addGame}) => {
  const [selectedTeams, setSelectedTeams] = useState({"home": "", "away": ""});

  const handleTeamSelection = (event) => { // prepare the selected teams for the new game in an object with scores
    const {name, value} = event.target;
    if (value !== "select") {
      setSelectedTeams({...selectedTeams, [name]: value});
    }
  }

  const handleNewGame = () => { // add the new game to the game list
    if (selectedTeams.home && selectedTeams.away) {
      addGame(selectedTeams);
      setSelectedTeams({"home": "", "away": ""})
    }
  }

  const resetForm = () => { // reset the form
    setSelectedTeams({"home": "", "away": ""})
  }

  return (
    <div className={"gameCreatorSection"}>
      <h3>Add new game</h3>
      <div className={"teamSelection"}>
        <label>Home</label>
        <select name={"home"} onChange={handleTeamSelection} value={selectedTeams.home}>
          <option value="select">Select home team</option>
          {countryList.map((country, index) => (
            <option key={index} value={country.name}>{country.name}</option>
          ))}
        </select>
      </div>
      <div className={"teamSelection"}>
        <label>Away</label>
        <select name={"away"} onChange={handleTeamSelection} value={selectedTeams.away}>
          <option value="select">Select away team</option>
          {countryList.map((country, index) => (
            <option key={index} value={country.name}>{country.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleNewGame}>Add Game</button>
      <button onClick={resetForm}>Reset</button>
    </div>
  );
};

export default GameCreator;
