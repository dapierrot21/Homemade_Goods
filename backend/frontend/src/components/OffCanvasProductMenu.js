import { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";

function OffCanvasProductMenu({ ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link>
        <i onClick={handleShow} className="fas fa-bars"></i>
      </Nav.Link>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        restoreFocus="true"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Home</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Words</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasProductMenu;
