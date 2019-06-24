
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from "./components/layouts/Header";
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Header/>

        <BrowserRouter>
          <Route path="/register" exact component={Register}/>
          <Route path="/login" exact component={Login}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
