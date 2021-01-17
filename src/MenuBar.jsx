import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Bloggers from './Components/Bloggers';
import Posts from './Components/Posts';
import PostDetails from './Components/PostDetails';
import CreatePost from './Components/CreatePost';
import PageNotFound from './Components/PageNotFound';

const MenuBar = () => {
  return (
    <>
      <Router>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand>
            <Link to='/'>Admin Dashboard</Link>
          </Navbar.Brand>
          <Nav className='mr-auto'>
            <Link to='/'>Home</Link>
            <Link to='/bloggers'>Bloggers</Link>
            <Link to='/create-post'>Create Post</Link>
          </Nav>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/create-post'>
            <CreatePost />
          </Route>
          <Route path='/posts/:id'>
            <Posts />
          </Route>
          <Route path='/post-details/:id'>
            <PostDetails />
          </Route>
          <Route path='/bloggers'>
            <Bloggers />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default MenuBar;
