import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import iconImg from '../images/logo.png';

function Navbar() {
  return (
    <div className='navbar'>
        <NavLink to='/' className='nav-logo'>
            <img src={iconImg} alt='logo' className='logo'/>
        </NavLink>
        <nav className='nav'>
            <NavLink to='/' className='nav-link'>
                Home
            </NavLink>
            <NavLink to='/about' className='nav-link'>
                About
            </NavLink>
            <NavLink to='/projects' className='nav-link'>
                Projects
            </NavLink>
            <NavLink to='/contact' className='nav-link'>
                Contact
            </NavLink>
        </nav>
    </div>
  );
}

export default Navbar;
