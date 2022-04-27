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
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="navbar-brand">
              Touched By Heaven
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id="offcanvasNavbarLabel"
                className="navbar-brand"
              >
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/" className="navbar-brand">
                  Home
                </Nav.Link>
                <NavDropdown
                  title="Products"
                  id="offcanvasNavbarDropdown"
                  className="navbar-brand"
                >
                  <NavDropdown.Item href="#action3" className="navbar-brand">
                    Luxe Candles
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#" className="navbar-brand">
                    Soaps
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#" className="navbar-brand">
                    Whipped Body Butters
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#" className="navbar-brand">
                    Lip Balms
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#" className="navbar-brand">
                    Whipped Sugar Scurbs
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="navbar-brand">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="navbar-brand"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link className="navbar-brand">
                      <i className="fas fa-user"></i> Login
                    </Nav.Link>
                  </LinkContainer>
                )}
                <LinkContainer to="/cart">
                  <Nav.Link className="navbar-brand">
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                    <NavDropdown title="Admin" id="adminmenu">
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item className="navbar-brand">
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item className="navbar-brand">
                          Products
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item className="navbar-brand">
                          Orders
                        </NavDropdown.Item>
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
