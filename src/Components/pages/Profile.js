import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Profile.css'
const Profile = () => {
  const location = useLocation();
  const userData = location.state?.userData || {};
  return (
    <div className='pro'>
      <img src={userData.userpicture} alt="" />
      <h5>{userData.username}</h5>
      {/* <h6>{userData.useremail}</h6> */}
    </div>
  );
};
export default Profile;