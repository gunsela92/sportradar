This project is bootstraped with create-react-app for Sportradar.

# Install dependencies
npm install

# Run the app
npm start

# App description

This is a scoreboard app that allows to create new games, update scores and finish games.

The scoreboard supports the following operations:
1. Start a new game, assuming initial score 0 – 0 and adding it the scoreboard.
2. Update score.
3. Finish game currently in progress. This removes a match from the scoreboard.
4. Get a summary of games in progress ordered by their total score. The games with the same
   total score will be returned ordered by the most recently started match in the scoreboard.

The games are stored in the local storage of the browser.

* **There is no library used for the state management. The state is managed by the React components.**
* **There is no ui framework used. Tried to keep it simple and use only the basic html elements.**
