import React, { useEffect } from 'react';
import './scss/components.scss';
import getToken from './app/services/getToken';
import Playlist from './app/components/playlist';
import FeaturedList from './app/components/featuredList';

interface Props {
  categories?: string;
}

const App: React.FC = () => {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="App">
      <header className="App-header" />
      <Playlist />
      <FeaturedList />

    </div>
  );
};

export default App;
