import './Postplay.css';
import { useState } from 'react';
import axios from 'axios';

const Postplay = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/users/postplay",
        {
          id,
          name,
        },
      );
      console.log("PlayList Created");
      console.log(response.data); 
      
      setId("");
      setName("");
    } catch (error) {
      console.error("Error creating playlist");
      console.error(error); 
    }
}
return (
    <div className='' >
          <form className='containerpostplay' onSubmit={handleSubmit}>
            <input type="text" className='inputpostplay' placeholder='Id' value={id} onChange={handleIdChange} /><br />
            <input type="text" className='inputpostplay' placeholder='PlayList Name' value={name} onChange={handleNameChange} /><br />
            <input type="submit" className='buttonpostplay' value="Submit"></input>
          </form>
        </div>
  );
};
export default Postplay;