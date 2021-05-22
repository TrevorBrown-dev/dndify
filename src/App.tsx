import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import Home from './components/Home';
import CreateCharacter from './components/CreateCharacter';

/*
  GOAL:
  The app will serve as an interactive character sheet for dnd 5e.
  There will be a number of sections. All of the logic for the app will be contained on a single page


  PAGES:
    Character Select:
      Here they can load their character json data into the app or create a new one
    Character Create?:
      Possibly unessicarry

    Character View:
      This is the main page of the app all of the apps logic will be here

*/


const App: React.FC = (props) => {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="page-container">


        <Switch>

          {/* Create Character Page */}
          <Route path="/create" exact>
            <CreateCharacter />
          </Route>


          {/* Home Page */}
          <Route path="/" exact>
            <div></div>
            <Home />
          </Route>


        </Switch>


      </div>
    </Router >
  );
}

export default App;
