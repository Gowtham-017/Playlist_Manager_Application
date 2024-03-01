import React, { useState } from 'react';
import '../styles/NewPlayList.css';
import Content from './Content';
import { FaHeart } from 'react-icons/fa';
const NewPlaylist = (onSearch) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };
  return (
    <div className="new-playlist">
      <div >
        <center><h1>Made for you <FaHeart style={{color:"red"}}/></h1></center>
      </div>
      <div>
        <form className="search-form" onSubmit={''}>
        <input type="text"  placeholder="Search for songs..."  value={searchTerm} onChange={handleInputChange} />  
        </form>
        <Content searchTerm={searchTerm} />
      </div>
    </div>
  );
};
export default NewPlaylist;