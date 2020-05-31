import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
// import './styles/react-dates-override.css';   // TODO: make this work

// Set up store
const store = configureStore();
console.log('Dev tools working fine');

// Setup rendering
const jsx = (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx,document.getElementById('body'));
    hasRendered = true;
  }
}

// Render loading page
ReactDOM.render(<LoadingPage />,document.getElementById('body'));

// Authenticate user
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Logged in.')
    store.dispatch(login(user.uid))
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    console.log('Logged out.')
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});


