import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaBars,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";
import "../styles/Sidebar.css";
import NewPlaylist from "./NewPlayList";
import Playlist1 from "./Playlist1";
import Postplay from "../Crud/Postplay";
import axios from "axios";
import Profile from "./Profile";
import "../styles/MusicOverlay.css";

const Sidebar = () => {
  const location = useLocation();
  const userData = location.state?.userData || {};

  // display home and playlist content
  const [open, setOpen] = useState(false);
  const [home, setHome] = useState(false);
  const handleOpenPlaylist = (e) => {
    setOpen(true);
    setHome(false);
  };
  const handleOpenHome = (e) => {
    setHome(true);
    setOpen(false);
  };

  // user profile in navbar
  const [openuser, setOpenUser] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenUser(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  // popupdialog box to create playlist
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsOpen(true);
  };
  // popupdialog box to delete playlist
  const [isDelete, setIsDelete] = useState(false);
  const handleOpenDelete = () => {
    setIsDelete(true);
  };
  const handleCloseDelete = () => {
    setIsDelete(false);
  };
  //getplaylists
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/users/getplay")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //delete playlists
  const [id, setId] = useState("");
  const deleteplayid = (evt) => {
    axios
      .delete(`http://localhost:8081/api/v1/users/deleteplay/${id}`)
      .then(alert("Deleted Playlist"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="">
      <div className="nav">
        <nav className="menu">
          <div className="leftnav">
            <FaHome
              style={{ color: "white", margin: "12px 5px 10px 30px" }}
              onClick={handleOpenHome}
              size={35}
            />
          </div>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search here"
              style={{ padding: "10px 10px 10px 30px", width: "50%" }}
              onChange={""}
              className="search"
              value={""}
            />
          </div>
          <h2 style={{ color: "white", padding: "0 450px 0 0" }}>MUSIFY</h2>
          {/* user profile */}
          <div className="rightnav">
            <div className="profile"></div>
            <div className="menu-container" ref={menuRef}>
              <div
                className=""
                onClick={() => {
                  setOpenUser(!openuser);
                }}
              >
                <FaUser
                  style={{ color: "white", padding: " 9px 50px 4px 20px" }}
                  size={25}
                />
              </div>
              {/* user profile sub contents */}
              <div
                className={`dropdown-menu ${openuser ? "active" : "inactive"}`}
              >
                <ul>
                  <Profile userData={userData} />
                  <Link to="Feedback">
                    <DropdownItem text={"Feedback"} />
                  </Link>
                  <Link to="Signin">
                    <DropdownItem text={"Logout"} />
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* sidebar contents */}
      <div className="sidebarsection">
        <div className="homepage">
          {/* left side section */}
          <div className="leftsection">
            <div>
              <button className="head3">
                <div className="head1">
                  <FaBars size={16} /> PlayList
                </div>
                <div className="circle">
                  <FaPlusCircle
                    size={45}
                    onClick={handleOpenPopup}
                    className="head2"
                  />
                  <FaMinusCircle
                    size={45}
                    onClick={handleOpenDelete}
                    className="head2"
                  />
                </div>
              </button>
            </div>
            {/* list of playlists */}
            <div>
              <table id="songs" border={1}>
                <thead>
                  <tr></tr>
                </thead>
                {data.map((play) => {
                  return (
                    <>
                      <tbody>
                        <tr onClick={handleOpenPlaylist} key={play.id}>
                          <td>{play.id}</td>
                          <td>{play.name}</td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </div>
            <div></div>
          </div>
          {/* right section of home page */}
          <div className="rightsection">
            {
              !open && !home && <div className="homebg"></div>
            }
            {open && <Playlist1 />}
            {home && <NewPlaylist />}
            {/* popup container to create new list */}
            {isOpen && (
              <div className="popup-container">
                <div className="popup-content">
                  <h4>PlayList Name</h4>
                  <Postplay />
                </div>
              </div>
            )}
            {isDelete && (
              <div className="popup-container">
                <div className="popup-content">
                  <input
                    type="text"
                    className="inputdelete"
                    placeholder="PlaylistId"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <div className="delbutton">
                    <button className="" onClick={deleteplayid}>
                      Delete
                    </button>
                    <button className="" onClick={handleCloseDelete}>
                      Close
                    </button>{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="homefoot">
        <a href="https://www.instagram.com/">
          <FaInstagram size={20} />
        </a>
        <a href="https://twitter.com/">
          <FaTwitter size={20} />
        </a>
        <a href="https://www.linkedin.com/">
          <FaLinkedin size={20} />
        </a>
        <a href="https://www.facebook.com/">
          <FaFacebook size={20} />
        </a>
        <a href="https://www.youtube.com/">
          <FaYoutube size={20} />
        </a>
        <h6 style={{ color: "black" }}>© 2023 Copyright: Musify.com</h6>
      </div>
    </div>
  );
};
export default Sidebar;
function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <p> {props.text} </p>
    </li>
  );
}