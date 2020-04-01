import React, { useEffect, useState } from 'react';

interface Images {
  url?: string;
}

const Playlist: React.FC = () => {
  const [list, setNewState] = useState([]);
  const key = localStorage.getItem('token');
  async function goPlaylist(): Promise<void> {
    try {
      const categories = await fetch(' https://api.spotify.com/v1/browse/featured-playlists', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;',
          Authorization: `Bearer ${key}`, // eslint-disable-line
        },
      });
      const catAsJson = await categories.json();
      setNewState(catAsJson.playlists.items);
      console.log(catAsJson);
    } catch (err) {
      console.log('fetch failed', err);
    }
  }

  useEffect(() => {
    goPlaylist();
  }, []); // eslint-disable-line
  return (
    <div className="container">
      {
        list.map((item: any) => (
          <div className="playlist">
            <div className="animation">
              <div className="music-bar">
                <span className="bar-1" />
                <span className="bar-2" />
                <span className="bar-3" />
                <span className="bar-4" />
              </div>
              <a className="linkToModal" href={item.href}>Click to open playlist</a>
            </div>
            {
              item.images.map((img: Images) => <img src={img.url} alt="" />)
            }
          </div>
        ))
      }
    </div>
  );
};

export default Playlist;
