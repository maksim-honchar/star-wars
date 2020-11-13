import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { HomePage } from './app/homepage/HomePage'
import { PeoplePage } from './people/PeoplePage'
import { SinglePersonPage } from './people/SinglePersonPage'
import { FilmsPage } from './films/FilmsPage'
import { SingleFilmPage } from './films/SingleFilmPage'
import { PlanetsPage } from './planets/PlanetsPage'
import { SinglePlanetPage } from './planets/SinglePlanetPage'
import { SpeciesPage } from './species/SpeciesPage'
import { SingleSpeciesPage } from './species/SingleSpeciesPage'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <HomePage />
              </React.Fragment>
            )}
          />
          <Route exact path="/people/" component={PeoplePage} />
          <Route exact path="/people/:personName" component={SinglePersonPage} />
          <Route exact path="/films/" component={FilmsPage} />
          <Route exact path="/films/:filmTitle" component={SingleFilmPage} />
          <Route exact path="/planets/" component={PlanetsPage} />
          <Route exact path="/planets/:planetName" component={SinglePlanetPage} />
          <Route exact path="/species/" component={SpeciesPage} />
          <Route exact path="/species/:kindName" component={SingleSpeciesPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
