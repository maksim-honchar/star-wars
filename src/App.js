import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { TopBar } from './app/TopBar'
import { HomePage } from './app/HomePage'
import { PlanetsPage } from './planets/PlanetsPage'
import { SinglePlanetPage } from './planets/SinglePlanetPage'


function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
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
          <Route exact path="/planets/" component={PlanetsPage} />
          <Route exact path="/planets/:planetName" component={SinglePlanetPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
