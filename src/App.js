import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { HomePage } from './app/homepage/HomePage'
import { PlanetsPage } from './planets/PlanetsPage'
import { SinglePlanetPage } from './planets/SinglePlanetPage'
import { FilmsPage } from './films/FilmsPage'


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
          <Route exact path="/films/" component={FilmsPage} />
          <Route exact path="/planets/" component={PlanetsPage} />
          <Route exact path="/planets/:planetName" component={SinglePlanetPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
