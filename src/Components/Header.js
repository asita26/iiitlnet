import React from 'react'
import '../CSS/homepage.css'
const Header = () => {
  return (
    <div>
    <header id="header" className="header bg-#ebe8e7" >
   
    
  
    <img src="https://ik.imagekit.io/cmef8hxb6/Screenshot_2023-04-24_at_20.42.53_05THu9eNw.png?updatedAt=1682428505847" className="logo" alt="Learn English" id="header-img" />
    <nav id="nav-bar" className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a className="nav-link" href="/events">Events</a>
        </li>
        <li className="nav-item">
        <a  className="nav-link" href="/feed">Feed</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/people">People</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile">Profile</a>
        </li>
       
      </ul>
    </nav>
    <button className="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span className="visuallyhidden">Menu</span>
      <span className="hamburger"></span>
    </button>
  </header>
  
    </div>
  )
}

export default Header
