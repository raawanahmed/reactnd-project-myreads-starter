import React from "react";
import BooksShelf from "./components/booksShelf";
import SearchPage from "./components/searchPage.js";
import "./App.css";
import {Switch, Route, Redirect} from "react-router-dom"

class BooksApp extends React.Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/" component={BooksShelf} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
