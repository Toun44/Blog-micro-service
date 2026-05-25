import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">📝 Blog MS</NavLink>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/articles" className={({ isActive }) => isActive ? 'active' : ''}>Articles</NavLink></li>
        <li><NavLink to="/categories" className={({ isActive }) => isActive ? 'active' : ''}>Catégories</NavLink></li>
      </ul>
    </nav>
  )
}
