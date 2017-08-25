import React from 'react'
import PropTypes from 'prop-types'

const preventDefault = (fun) => (e) => {
  e.preventDefault()
  fun()
}

const Error = ({ resetError }) => (
  <div className="centered">An error occured. <a href="#" onClick={preventDefault(resetError)}>Go back</a>.</div>
)

Error.propTypes = {
  resetError: PropTypes.func.isRequired
}

export default Error
