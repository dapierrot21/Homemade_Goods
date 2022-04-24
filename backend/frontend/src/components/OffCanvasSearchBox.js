import { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import SearchBox from "./SearchBox";

function OffCanvasSearchBox({ ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link>
        <i onClick={handleShow} className="fas fa-search"></i>
      </Nav.Link>

      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SearchBox />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasSearchBox;
