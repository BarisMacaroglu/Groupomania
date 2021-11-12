import React, {useContext} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthApi from "./AuthApi";
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import OnePost from "./pages/OnePost";
import User from "./pages/User";
import Profile from "./pages/Profile";

function Routes() {

    const Auth = useContext(AuthApi);

    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component ={Home} />
            <Route exact path="/signup" component ={Signup} />
            <Route exact path="/login" component ={Login} />
            <Route exact path="/posts" auth={Auth.auth} component ={Post} />
            <Route exact path="/posts/:id"  component ={OnePost} />
            <Route exact path="/users"  component={User}/>
            <Route exact path="/users/:id"  component={Profile}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes



/*
let navLink;
  if(auth === true) {
    const userId = localStorage.getItem("userId");

    navLink = <div>
      <Nav>
        <Link to="/posts" className="nav-link">Tous les posts</Link>
        <Link to={"/users/" + userId} className="nav-link">Mon compte</Link>
      </Nav>
    </div>
  } else {
    navLink = <div>
      <Nav>
        <Link to="/signup" className="nav-link">S'inscrire</Link>
        <Link to="/login" className="nav-link">Se connecter</Link>
      </Nav>
    </div>
  }

  return (
    <React.Fragment>
      <AuthApi.Provider value={{auth, setAuth}}>
        <Router>
          <Navbar sticky="top" bg="dark" variant="dark">
            <Link to="/"></Link>
            {navLink}
          </Navbar>
        </Router>
      </AuthApi.Provider>
    </React.Fragment>
  );
}

<div>
      <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/signup">S'inscrire</Link>
      <Link to="/login">Se connecter</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/users">Users</Link>
        <Switch>
            <Route exact path="/" component ={Home} />
            <Route exact path="/signup" component ={Signup} />
            <Route exact path="/login" component ={Login} />
            <Route exact path="/posts"  component ={Post} />
            <Route exact path="/posts/:id"  component ={OnePost} />
            <Route exact path="/users"  component={User}/>
            <Route exact path="/users/:id"  component={Profile}/>
        </Switch>
      </BrowserRouter>
    </div>

    */