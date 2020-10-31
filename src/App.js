import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { HomePage } from './features/planets/HomePage'
import { TopBar } from './app/TopBar'

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
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
