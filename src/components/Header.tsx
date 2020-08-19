import React, {useState, FunctionComponent} from 'react';
import logo from '../logo.svg';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
  NavItem, NavbarText } from "reactstrap";
import { Link } from 'react-router-dom';

const Header: FunctionComponent = () => {

  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (<div>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand >
        <Link to='/'>
        <img src={logo} width="30" height="30" className="d-inline-block align-top" />{' '}
          TechBlog.com
          </Link>
      </NavbarBrand>{' '}
      <NavbarToggler onClick={toggleNavbar}/>
        <Collapse isOpen={collapsed} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to='/create'>Create</Link>
            </NavItem>
          </Nav>
          <NavbarText>Welcome Neha</NavbarText>
        </Collapse>
      </Navbar>
    </div>);
};

export default Header;
