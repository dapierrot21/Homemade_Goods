import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" expand={false}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Touched By Heaven</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Products" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">
                    Luxe Candles
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">Soaps</NavDropdown.Item>
                  <NavDropdown.Item href="#">
                    Whipped Body Butters
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">Lip Balms</NavDropdown.Item>
                  <NavDropdown.Item href="#">
                    Whipped Sugar Scurbs
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Login
                    </Nav.Link>
                  </LinkContainer>
                )}
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                    <NavDropdown title="Admin" id="adminmenu">
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </NavDropdown>
                )}
              </Nav>
              <SearchBox />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
