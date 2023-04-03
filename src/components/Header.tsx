import logo from '../assets/Logo.svg';

import './Header.css';

export function Header() {
  return (
    <header>
      <img src={logo} alt="ToDo List" />
    </header>
  )
}