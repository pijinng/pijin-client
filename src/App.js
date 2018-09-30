import React, { Component } from 'react';
import './App.css';
import Container from './containers/Container';
import { Link, Route } from 'react-router-dom';
import Random from './components/Random';

const Home = () => <div>Home</div>;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <div className="menubar">
              <h1 className="App-title">Pijin.ng</h1>
              <ul className="menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/entries/random">Random</Link>
                </li>
              </ul>
            </div>
          </Container>
        </header>

        <Route exact path="/entries/random" component={Random} />
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
