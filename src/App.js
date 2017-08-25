import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import keyBy from 'lodash.keyby'
import groupBy from 'lodash.groupby'
import Search from './Search'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {

  state = {
    books: [],
    loadingBooks: false,
    errorLoadingBooks: false,
    updatingBooks: false,
    errrorUpdatingBooks: false
  }

  getBooks = () => {
    this.setState({ loadingBooks: true })
    BooksAPI
      .getAll()
      .then(books => {
        this.setState({ loadingBooks: false })
        if (Array.isArray(books)) {
          this.setState({ books })
        } else {
          this.setState({ books: [] })
        }
      })
      .catch(() => this.setState({ loadingBooks: false, errorLoadingBooks: true }))
  }

  onBookShelfChange = (selectedBook, targetBookShelf) => {
    const currentShelf = selectedBook.shelf || "none"
    if (currentShelf !== targetBookShelf) {
      this.setState({ updatingBooks: true })
      BooksAPI.update(selectedBook, targetBookShelf)
        .then(() => {
          this.setState({ updatingBooks: false })
          this.setState(state => {
            const booksWithoutSelectedBook = state.books.filter(book => book.id !== selectedBook.id)
            return (targetBookShelf === "none")
              ? { books: booksWithoutSelectedBook }
              : { books: booksWithoutSelectedBook.concat({ ...selectedBook, shelf: targetBookShelf}) }
          })
        })
        .catch(() => this.setState({ updatingBooks: false, errrorUpdatingBooks: true }))
    }
  }

  resetErrorUpdatingBooks = () => this.setState({ errrorUpdatingBooks: false })

  reset = () => {
    this.setState({
      books: [],
      loadingBooks: false,
      errorLoadingBooks: false,
      updatingBooks: false,
      errrorUpdatingBooks: false
    })
    this.getBooks()
  }

  render() {
    const booksById = keyBy(this.state.books, 'id')
    const booksByShelf = groupBy(this.state.books, 'shelf')
    return (
      <div className="app">
        <Switch>
          <Route path='/search' render={() => (
              <Search
                booksById={booksById}
                updatingBooks={this.state.updatingBooks}
                errrorUpdatingBooks={this.state.errrorUpdatingBooks}
                resetErrorUpdatingBooks={this.resetErrorUpdatingBooks}
                onBookShelfChange={this.onBookShelfChange}
              />
          )}/>
          <Route path='/' render={() => (
              <ListBooks
                booksByShelf={booksByShelf}
                loadingBooks={this.state.loadingBooks}
                updatingBooks={this.state.updatingBooks}
                error={this.state.errorLoadingBooks || this.state.errrorUpdatingBooks}
                onBookShelfChange={this.onBookShelfChange}
                getBooks={this.getBooks}
                resetError={this.reset}
              />
          )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
