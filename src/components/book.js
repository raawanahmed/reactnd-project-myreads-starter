import React, { Component } from "react";

class Book extends Component {
  generateImageLink() {
    try {
      return `url("${this.props.data.imageLinks.smallThumbnail}")`;
    } catch {
      return "url()";
    }
  }

  generateAuthorNames() {
    let authorsNames = "";
    const { data: book } = this.props;
    if (book) {
      if (book.authors && book.authors.length > 0) {
        this.props.data.authors.forEach((element) => {
          authorsNames += element + " ";
        });
      } else authorsNames = "";
    }
    return authorsNames;
  }

  render() {
    const { data: book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 130,
              height: 190,
              backgroundImage: this.generateImageLink(),
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(event) => {
               
                this.props.handleShelfUpdate(book, event.target.value); 
                console.log("Event", event.target.value);
                console.log("book", book);
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{this.generateAuthorNames()}</div>
      </div>
    );
  }
}
export default Book;
