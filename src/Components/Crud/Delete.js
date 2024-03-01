import './Delete.css';
import { useState } from 'react';
import axios from 'axios';

const Post = () => {
  const [songid,setSongId]=useState("");
  const deleteId=(evt)=>{
      axios.delete(`http://localhost:8081/deletesong/${songid}`)
      .then( alert("Deleted Song Details"))
      .catch(err=>console.log(err))
  }
  return (
    <div>
      <h1>Delete Song Details</h1><br />
      <form className='containerdelete'>
        <input type="text" className='inputdelete' placeholder='SongId' value={songid} onChange={e=>setSongId(e.target.value)} /><br /><br /><br />
        <input type="button" className='buttondelete' onClick={deleteId}value="Submit"></input>
      </form>
    </div>
  );
};
export default Post;