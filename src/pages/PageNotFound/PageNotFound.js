import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
        <div className="notfound-container">
            <div className="error-text mx-auto" data-text="404">404</div>
            <p className="lead text-gray-800 mb-4">Page Not Found</p>
            <p className="text-gray-500 mb-0">What are you looking for?</p>
            <p className="text-gray-500 mb-4">We can't find the page you're looking for...</p>
            <Link to="/">← Back to Home</Link>
        </div>
    </>
  )
}

export default React.memo(PageNotFound)