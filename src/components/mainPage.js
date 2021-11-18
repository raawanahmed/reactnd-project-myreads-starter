import React, { Component } from "react";
import BooksShelf from "./booksShelf";
import { Link } from "react-router-dom";

// The main page shows 3 shelves for books
// main page allow users to move books between shelves

class MainPage extends Component {
  render() {
    return (
      <div>
        <BooksShelf />
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
