import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAll, update, search } from "../BooksAPI";
import Book from "./book";

class SearchPage extends Component {
  state = {
    currentBooks: [],
    updateShelves: false,
    searchValue: "",
  };

  handleShelvesOnUpdate = async () => {
    let allBooks = await getAll();
    let curBooks = [...this.state.currentBooks];

    for (let i = 0; i < allBooks.length; i++) {
      for (let j = 0; j < curBooks.length; j++) {
        if (allBooks[i].id === curBooks[j].id) {
          curBooks[j].shelf = allBooks[i].shelf;
        }
      }
    }
    // console.log("Updatedddd");
    this.setState({ currentBooks: curBooks, updateShelves: true });
  };

  componentDidUpdate() {
    if (!this.state.updateShelves) {
      this.handleShelvesOnUpdate();
    }
  }

  handleShelfUpdate = async (book, shelf) => {
    const index = this.state.currentBooks.findIndex((b) => b.id === book.id);
    const bookWillBeUpdated = this.state.currentBooks[index];
    bookWillBeUpdated.shelf = shelf;
    let newBooks = [...this.state.currentBooks];
    newBooks[index] = bookWillBeUpdated;
    this.setState({ currentBooks: newBooks });
    await update(book, shelf);
  };

  handleSearch = async (searchInput) => {
    this.setState({ searchValue: searchInput });
    let searchBooks = await search(searchInput);
    if (!searchBooks || searchBooks.error) searchBooks = [];
    this.setState({ currentBooks: searchBooks, updateShelves: false });
  };

  render() {
    if (this.state.search === "") {
      this.state.currentBooks = [];
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => {
                this.handleSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.currentBooks.length > 0 ? (
              this.state.currentBooks.map((book) => (
                <li key={book.id}>
                  <Book
                    data={book}
                    handleShelfUpdate={this.handleShelfUpdate}
                  />
                </li>
              ))
            ) : (
              <p>Search by title or author</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
