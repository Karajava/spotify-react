import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import fetcher from './app/services/fetcher';

interface Data {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

interface Response {
  data?: Data;
  headers?: Headers;
}

const App: React.FC = () => {
  const [responseData, setData] = useState<Data | undefined>({
    copyright: '', date: '', explanation: '', hdurl: '', media_type: '', service_version: '', title: '', url: '',
  });

  async function fetchData(): Promise<void> {
    try {
      const response: Response = await fetcher
        .get('https://api.nasa.gov/planetary/apod');

      setData(response.data);
    } catch (err) {
      console.log('fetch failed', err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {responseData && responseData.explanation}
        </p>
      </header>
    </div>
  );
};

export default App;
