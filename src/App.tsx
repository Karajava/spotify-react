import React from 'react';
import logo from './logo.svg';
import './App.scss';
import fetcher from './app/services/fetcher';

class App extends React.PureComponent {
  componentDidMount() {
    fetcher.get('https://api.spotify.com/v1/me/albums?limit=1')
      .then((myJson) => {
        console.log(myJson);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit
            <code>src/App.js</code>
            and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
