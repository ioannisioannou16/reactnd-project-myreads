import React from 'react'
import BookGrid from './BookGrid'
import PropTypes from 'prop-types'

const BookShelf = ({ title, books, onBookShelfChange }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <BookGrid books={books} onBookShelfChange={onBookShelfChange}/>
    </div>
  </div>
)

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookShelfChange: PropTypes.func.isRequired
}

export default BookShelf
