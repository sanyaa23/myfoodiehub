import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mb-0 border-top text-light bg-light">
        <div className="col-md-4 d-flex align-items-center" >
          <Link to="/" className="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1" >
          </Link>
          <span className="text-muted footer-text" >© 2024 Foodiehub, Inc</span>
        </div>
      </footer>
    </div>
  )
}
