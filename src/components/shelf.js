import React, { Component } from "react";
import Book from "./book";
import PropTypes from "prop-types";

class Shelf extends Component {
  render() {
    const { title, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  handleShelfUpdate={this.props.handleShelfUpdate}
                  data={book}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
};
