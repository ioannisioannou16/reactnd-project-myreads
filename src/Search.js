import React from 'react'
import BookGrid from './BookGrid'
import Loading from './Loading'
import Error from './Error'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'

class Search extends React.Component {

  state = {
    results: [],
    searchTerm: '',
    loadingResults: false,
    errorLoadingResults: false
  }

  searchBooks = debounce((searchTerm) => (
    BooksAPI.search(searchTerm, 20)
      .then(results => {
        this.setState({ loadingResults: false })
        if (this.state.searchTerm && Array.isArray(results)) {
          this.setState({ results })
        } else {
          this.setState({ results: [] })
        }
      })
      .catch(() => this.setState({ loadingResults: false, errorLoadingResults: true }))
  ), 200)

  onSearchChange = (searchTerm) => {
    this.reset(true)
    this.setState({ searchTerm })
    if (searchTerm) {
      this.setState({ loadingResults: true })
      this.searchBooks(searchTerm)
    } else {
      this.reset()
    }
  }

  reset = (keepResults = false) => {
    this.setState(state => ({
      results: keepResults ? state.results : [],
      searchTerm: '',
      loadingResults: false,
      errorLoadingResults: false
    }))
    this.props.resetErrorUpdatingBooks()
  }

  render() {
    const { booksById, onBookShelfChange, updatingBooks, errrorUpdatingBooks } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.reset}>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={e => this.onSearchChange(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          {
            (this.state.errorLoadingResults || errrorUpdatingBooks)
              ? <Error resetError={() => this.onSearchChange(this.state.searchTerm)}/>
              : this.state.loadingResults && !this.state.results.length
              ? <Loading/>
              : !this.state.results.length
              ? <div className="centered">No Results</div>
              : <BookGrid onBookShelfChange={onBookShelfChange} books={this.state.results.map(resultBook => booksById[resultBook.id] || resultBook)}/>
          }
          {
            updatingBooks || (this.state.loadingResults && this.state.results.length)
              ? <Loading/>
              : null
          }
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  booksById: PropTypes.object.isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
  updatingBooks: PropTypes.bool.isRequired,
  errrorUpdatingBooks: PropTypes.bool.isRequired,
  resetErrorUpdatingBooks: PropTypes.func.isRequired
}

export default Search
