import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookGrid = ({ books, onBookShelfChange }) => (
  <ol className="books-grid">
    {books.map(book => (
      <li key={book.id}><Book book={book} onBookShelfChange={onBookShelfChange}/></li>
    ))}
  </ol>
)

BookGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookShelfChange: PropTypes.func.isRequired
}

export default BookGrid
