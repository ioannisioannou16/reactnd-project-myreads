import React from 'react'
import PropTypes from 'prop-types'

const BookShelfChanger = ({ book, onBookShelfChange }) => (
  <div className="book-shelf-changer">
    <select value={book.shelf || 'none'} onChange={e => onBookShelfChange(book, e.target.value)}>
      <option disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
)

BookShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  onBookShelfChange: PropTypes.func.isRequired
}

export default BookShelfChanger
