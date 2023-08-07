import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className='nav'>
      <NavLink exact to='/' className='nav-link' activeClassName='active'>
        Home
      </NavLink>
      <NavLink to='/about' className='nav-link' activeClassName='active'>
        About
      </NavLink>
      <NavLink to='/projects' className='nav-link' activeClassName='active'>
        Projects
      </NavLink>
      <NavLink to='/contact' className='nav-link' activeClassName='active'>
        Contact
      </NavLink>
    </nav>
  );
}

export default Navbar;
