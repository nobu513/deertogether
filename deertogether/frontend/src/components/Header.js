import React from "react";
import { Navbar, Container } from "react-bootstrap";
import AddUserModal from "./AddUserModal";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Speech Assist for You.</Navbar.Brand>
        <AddUserModal />
      </Container>
    </Navbar>
  );
}
