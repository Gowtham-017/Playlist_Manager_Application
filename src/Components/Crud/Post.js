import './Post.css';
import { useState } from 'react';
import axios from 'axios';
const Post = () => {
  const [songid, setSongId] = useState('');
  const [songname, setSongName] = useState('');
  const [songurl, setSongUrl] = useState('');

  const handleSongIdChange = (event) => {
    setSongId(event.target.value);
  };

  const handleSongNameChange = (event) => {
    setSongName(event.target.value);
  };

  const handleSongUrlChange = (event) => {
    setSongUrl(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      songid,
      songname,
      songurl,
    
    };

    try {
      await axios.post('http://localhost:8082/api/v1/auth/send-data', data);
      alert("Successfully Added the Data");
    } catch (error) {
      console.log(error);
      alert("Error occurred while posting data");
    }
  };
  return (
    <div className='' >
      <h1>Post Song Details</h1><br />
      <form className='containerpost' onSubmit={handleSubmit}>
        <input type="text" className='inputpost' placeholder='SongId' value={songid} onChange={handleSongIdChange} /><br /><br />
        <input type="text" className='inputpost' placeholder='Song Name' value={songname} onChange={handleSongNameChange} /><br /><br />
        <input type="text" className='inputpost' placeholder='Song URL' value={songurl} onChange={handleSongUrlChange} /><br /><br />
        <br />
        <input type="submit" className='buttonpost' value="Submit"></input>
      </form>
    </div>
  );
};
export default Post;