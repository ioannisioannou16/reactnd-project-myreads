import React from 'react'
import BookShelf from './BookShelf'
import Loading from './Loading'
import Error from './Error'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {

  shelves = {
    "currentlyReading": "Currently Reading",
    "wantToRead": "Want to Read",
    "read": "Read"
  }

  componentDidMount() {
    this.props.getBooks()
  }

  render() {
    const { booksByShelf, loadingBooks, updatingBooks, error, onBookShelfChange, resetError } =  this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              error
                ? <Error resetError={resetError}/>
                : loadingBooks && isEmpty(booksByShelf)
                ? <Loading/>
                : Object.entries(this.shelves).map(([key, value]) => {
                    const booksForGivenKey = booksByShelf[key] || []
                    const sortedBooks = booksForGivenKey.sort((a, b) => a.title.localeCompare(b.title))
                    return <BookShelf key={key} title={value} books={sortedBooks} onBookShelfChange={onBookShelfChange} />
                  })
            }
            {
              updatingBooks || (loadingBooks && !isEmpty(booksByShelf))
                ? <Loading/>
                : null
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

ListBooks.propTypes = {
  getBooks: PropTypes.func.isRequired,
  booksByShelf: PropTypes.object.isRequired,
  loadingBooks: PropTypes.bool.isRequired,
  updatingBooks: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired
}

export default ListBooks
