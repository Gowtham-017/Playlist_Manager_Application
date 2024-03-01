import React, { useState, useEffect, useRef } from "react";
import "../styles/Playlist1.css";
import {
  FaEllipsisV,
  FaPlay,
  FaSpotify,
  FaHeart,
  FaBackward,
  FaForward,
} from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../store";
import Post from "../Crud/Post";
import Put from "../Crud/Put";
import Delete from "../Crud/Delete";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const Playlist1 = () => {
  // redux
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state);

  const handleLike = (songId) => {
    dispatch(toggleLike(songId));
  };
  //open edit menu
  const [openedit, setOpenEdit] = useState(false);
  let editRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!editRef.current.contains(e.target)) {
        setOpenEdit(false);
        console.log(editRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  //getapi
  const [data, setData] = useState([]);
  const [songurldata, setSongUrlData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getsong")
      .then((response) => {
        setData(response.data);
        setSongUrlData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //audioplayer
  //add button
  const [showAdd, setShowAdd] = useState(false);
  const handleOpenAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  //edit button
  const [showEdit, setShowEdit] = useState(false);
  const handleOpenEdit = () => {
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  //delete button
  const [showDelete, setShowDelete] = useState(false);
  const handleOpenDelete = () => {
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioFiles = [
    require("../assets/audio/Flute.mp3"),
    require("../assets/audio/Naagaali.mp3"),
    require("../assets/audio/SitaRam.mp3"),
    require("../assets/audio/audiotest.mp3"),
  ];
  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  useEffect(() => {
    setIsPlaying(true);
  }, []);
  const playPreviousSong = () => {
    const previousIndex =
      (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
    setCurrentSongIndex(previousIndex);
  };
  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % audioFiles.length;
    setCurrentSongIndex(nextIndex);
  };

  return (
    <div className="body">
      <div className="listname">
        <h2
          style={{
            margin: "0px",
            padding: "40px 0 0 20px",
            alignItems: "center",
          }}
        >
          <FaSpotify /> My Playlist
        </h2>
      </div>

      <div className="playmus">
        <div
          ref={editRef}
          className=""
          onClick={() => {
            setOpenEdit(!openedit);
          }}
        >
          <FaPlay
            onClick={"handleOverlay"}
            size={20}
            style={{ color: "black", padding: "5px" }}
          />
          &nbsp;
          <FaEllipsisV
            style={{ color: "black", padding: " 9px 50px 4px 20px" }}
            size={25}
          />
        </div>

        <div className="add">
          <button onClick={handleOpenAdd} className="addbutton">
            Add
          </button>
          <button className="addbutton" onClick={handleOpenEdit}>
            Edit
          </button>
          <button className="addbutton" onClick={handleOpenDelete}>
            Delete
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="modal-container">
          <div className="modal-content">
            <Post />
            <button className="close-button" onClick={handleCloseAdd}>
              Close
            </button>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="modal-container">
          <div className="modal-content">
            <Put />
            <button className="close-button" onClick={handleCloseEdit}>
              Close
            </button>
          </div>
        </div>
      )}
      {showDelete && (
        <div className="modal-container">
          <div className="modal-content">
            <Delete />
            <button className="close-button" onClick={handleCloseDelete}>
              Close
            </button>
          </div>
        </div>
      )}

      <table id="songs" border={1}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col"></th>
            <th>Name</th>
            <th>Likes</th>
          </tr>
        </thead>
        {data.map((play) => {
          return (
            <>
              <tbody>
                <tr key={play.songid}>
                  <td>{play.songid}</td>
                  <td>
                    <img
                      src={play.songurl}
                      style={{ height: "50px", width: "50px" }}
                      alt=""
                    />
                  </td>
                  <td onClick={() => setCurrentSong(play.songurl)}>
                    {play.songname}
                  </td>
                  <td onClick={() => handleLike(play.songid)}>
                    {likedSongs[play.songid] ? (
                      <span style={{ color: "red" }}>
                        <FaHeart />
                      </span>
                    ) : (
                      <span style={{ color: "black" }}>
                        <FaHeart />
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
      <div className="audioplayer">
        <AudioPlayer
          autoPlay
          src={audioFiles[currentSongIndex]}
          onEnded={handleSongEnd}
          onPlay={(e) => console.log("onPlay")}
          customAdditionalControls={[
            <button
              key="previous"
              className="control-button"
              onClick={playPreviousSong}
            >
              <FaBackward /> Previous
            </button>,
            <button
              key="next"
              className="control-button"
              onClick={playNextSong}
            >
              Next <FaForward />
            </button>,
          ]}
        />

        <div className="current-song-name">
          {audioFiles[currentSongIndex] && (
            <p>Now Playing: {data[currentSongIndex]?.songname}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Playlist1;