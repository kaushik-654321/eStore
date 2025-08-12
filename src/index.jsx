import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
const REACT_APP_GOOGLE_CLIENT_ID = '865109130237-p0uh97lj61atu58hldi2o3b66gljuipo.apps.googleusercontent.com'
root.render(
  <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>

      <App />

    </PersistGate>
  </Provider>
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
