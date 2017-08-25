import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'
import NoCover from './icons/no_cover.jpg'

const Book = (props) => {
  const {
    title = 'Unknown Title',
    authors = ['Unknown Authors'],
    imageLinks = {}
  } = props.book
  const { smallThumbnail = NoCover } = imageLinks
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${smallThumbnail})`}}></div>
        <BookShelfChanger {...props}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(', ')}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookShelfChange: PropTypes.func.isRequired
}

export default Book
