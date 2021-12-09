import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";

export default function AddUserModal() {
  const [show, setShow] = useState(false);
  const [newName, setName] = useState("");
  const [newDoc, setDoc] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const create_user = () => {
    fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newName, doc: newDoc }),
    }).then(() => handleClose());
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        add user
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>User Name</h6>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              placeholder="Enter User Name"
              onChange={(e) => setName(e.target.value)}
              value={newName}
            />
          </Form.Group>
          <h6>Input Document.</h6>
          <InputGroup>
            <br />
            <FormControl
              as="textarea"
              onChange={(e) => setDoc(e.target.value)}
              value={newDoc}
            />
          </InputGroup>
        </Modal.Body>
        <Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type={"submit"} onClick={create_user}>
              Create User.
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
