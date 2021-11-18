import React, { Component } from "react";
import { getAll, update } from "../BooksAPI";
import { Link } from "react-router-dom";
import Shelf from "./shelf";
class BooksShelf extends Component {
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  getCurrentlyReadingBooks(books) {
    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    return currentlyReading;
  }

  getWantToReadBooks(books) {
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    return wantToRead;
  }

  getReadBooks(books) {
    const read = books.filter((book) => book.shelf === "read");
    return read;
  }

  async componentDidMount() {
    const books = await getAll();
    this.setState({
      allBooks: books,
      currentlyReading: this.getCurrentlyReadingBooks(books),
      wantToRead: this.getWantToReadBooks(books),
      read: this.getReadBooks(books),
    });
  }

  handleShelfUpdate = async (book, shelf) => {
    // get index of book will be updated
    const index = this.state.allBooks.findIndex((b) => b.id === book.id);
    const bookWillBeUpdated = this.state.allBooks[index];
    bookWillBeUpdated.shelf = shelf; // change shelf of the book has been updated
    let newBooks = [...this.state.allBooks];
    newBooks[index] = bookWillBeUpdated;
    console.log(this.state.allBooks[index], newBooks[index]);
    this.setState({ allBooks: newBooks });
    await update(book, shelf); // update in database
   // window.location.reload();
  };

  render() {
    console.log("1",this.state.currentlyReading);
    console.log("2", this.state.wantToRead);
    console.log("3",this.state.read);
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf
                title="Currently Reading"
                books={this.state.currentlyReading}
                handleShelfUpdate={this.handleShelfUpdate}
              />
              <Shelf
                title="Want To Read"
                books={this.state.wantToRead}
                handleShelfUpdate={this.handleShelfUpdate}
              />
              <Shelf
                title="Read"
                books={this.state.read}
                handleShelfUpdate={this.handleShelfUpdate}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
        )
      </div>
    );
  }
}

export default BooksShelf;
