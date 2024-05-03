import { Navbar, Nav, NavItem, NavLink } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand={false}>
      <Navbar.Brand href="#">Student Portal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavItem>
            <NavLink href="/student-login">Student Login</NavLink>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
