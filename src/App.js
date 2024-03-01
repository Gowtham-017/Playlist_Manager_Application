import React from 'react'
import Signin from './Components/pages/Signin'
import Signup from './Components/pages/Signup';
import Sidebar from './Components/pages/Sidebar'
import Playlist1 from './Components/pages/Playlist1';
import NewPlayList from './Components/pages/NewPlayList'
import Post from './Components/Crud/Post';
import Put from './Components/Crud/Put';
import Delete from './Components/Crud/Delete';
import Postplay from './Components/Crud/Postplay';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import Feedback from './Components/pages/Feedback';
import Profile from './Components/pages/Profile';
function App() {
  return (
    <div>
      <Router>
        <div className="App"> 
          <Switch>
            <Route exact path="/" component={Signin}></Route>
            <Route exact path="/Signup" component={Signup}></Route>
            <Route exact path="/Signin" component={Signin}></Route>
            <Route exact path="/Sidebar" component={Sidebar}></Route>
            <Route exact path="/NewPlayList" component={NewPlayList}></Route>
            <Route exact path="/Playlist1" component={Playlist1}></Route>
            <Route exact path="/Post" component={Post}></Route>
            <Route exact path="/Delete" component={Delete}></Route>
            <Route exact path="/Put" component={Put}></Route>
            <Route exact path="/Postplay" component={Postplay}></Route>
            <Route exact path="/Feedback" component={Feedback}></Route>
            <Route exact path="/Profile" component={Profile}></Route>
          </Switch>
        </div> 
      </Router> 
    </div>
  )
}
export default App