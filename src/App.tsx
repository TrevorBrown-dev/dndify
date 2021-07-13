import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import CreateCharacter from './components/CreateCharacter';
//Pages
import Home from './components/Home';
import { LoadCharacter } from './components/LoadCharacter/LoadCharacter';
import { blankCharacter, iCharacter, iCharacterModel, useCharacter } from './models/character';
import './styles/faall.min.css';
import './styles/style.css';
import { Testing } from './Testing';

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
    const char: iCharacterModel = blankCharacter();
    const character: iCharacter = useCharacter(char);
    return (
        <Router>
            <div className='page-container'>
                <Switch>
                    {/* Create Character Page */}
                    <Route path='/create' exact>
                        <CreateCharacter character={character} />
                    </Route>

                    <Route path='/load' exact>
                        <LoadCharacter character={character} />
                    </Route>

                    {/* Home Page */}
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/testing' exact>
                        <Testing />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
