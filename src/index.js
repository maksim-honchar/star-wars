import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'



const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
})


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
