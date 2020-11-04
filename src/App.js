import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { TopBar } from './components/TopBar'
import { HomePage } from './components/HomePage'
import { SinglePlanetPage } from './components/SinglePlanetPage'


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
          <Route exact path="/planets/:planetName" component={SinglePlanetPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
