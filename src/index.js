import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import  firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCk72CeohNTDcPt7ioEd-cYhk1PO0G1un0",
  authDomain: "cart-cdffd.firebaseapp.com",
  databaseURL: "https://cart-cdffd.firebaseio.com",
  projectId: "cart-cdffd",
  storageBucket: "cart-cdffd.appspot.com",
  messagingSenderId: "59225783037",
  appId: "1:59225783037:web:f7d7859a51748601191c94",
  // measurementId: "G-9G39ESSZSV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();
