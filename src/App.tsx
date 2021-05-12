import React, { useState } from 'react';
import { CreateCharacter } from './components/CreateCharacter/CreateCharacter';
import { DnDAndSVG } from './components/svg/DnDAndSVG';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
/*
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
  const [link, setLink] = useState('');
  return (
    <Router>
      <div className="page-container">
        <Switch>
          <Route path="/create">
            <CreateCharacter />
          </Route>
          <Route path="/">
            <Home />
          </Route>



        </Switch>




      </div>


    </Router>
  );
}

export default App;
