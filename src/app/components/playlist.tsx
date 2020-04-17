import React, { useEffect, useState } from 'react';
import Modal from '../modal/Modal';

interface Images {
  url?: string;
}

const Playlist: React.FC = () => {
  const [list, setNewState] = useState([]);
  const [modalIsOpen, setModalState] = useState(false);
  const key = localStorage.getItem('token');
  const [newList, setNewList] = useState({});

  async function goPlaylist(): Promise<void> {
    try {
      const categories = await fetch(' https://stats.nba.com/stats/playercareerstats', {
      });
      const catAsJson = await categories.json();
      console.log(catAsJson);
      setNewState(catAsJson);
    } catch (err) {
      console.log('fetch failed', err);
    }
  }

  async function featuredList(url: string): Promise<void> {
    try {
      const featuredPlaylist = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;',
          Authorization: `Bearer ${key}`, // eslint-disable-line
        },
      });
      const listAsJson = await featuredPlaylist.json();
      setNewList(listAsJson.tracks);
    } catch (err) {
      console.log('fetch failed', err);
    }
  }

  const openModal = (url: string) => {
    featuredList(url).then(() => setModalState(true));
  };

  const closeModal = () => {
    setModalState(false);
  };

  useEffect(() => {
    goPlaylist();
  }, []); // eslint-disable-line

  return (
    <div className="container">
      {
        list.map((item: any) => (
          <div className="playlist">
            {modalIsOpen && <Modal modalIsOpen={modalIsOpen} modalStatus={closeModal} data={newList} />}
            <div className="animation">
              <div className="music-bar">
                <span className="bar-1" />
                <span className="bar-2" />
                <span className="bar-3" />
                <span className="bar-4" />
              </div>
              <div>
                Click to open playlist
              </div>
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
