import React, { useState, useEffect } from 'react';
import './scss/components.scss';
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
        .post('https://accounts.spotify.com/api/token', { grant_type: 'client_credentials' });

      setData(response.data);
      console.log(response);
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
        <p>
          {responseData && responseData.explanation}
        </p>
      </header>
    </div>
  );
};

export default App;
