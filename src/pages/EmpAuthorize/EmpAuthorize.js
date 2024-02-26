import React from 'react'
import { Link } from 'react-router-dom'

const EmpAuthorize = () => {
  return (
    <>
        <div className="notfound-container">
            <h1 className="lead text-gray-800 mb-6"> You are not Authorized </h1>
            <Link to="/">← Back to Home</Link>
        </div>
    </>
  )
}

export default React.memo(EmpAuthorize)