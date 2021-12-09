import "./App.css";
import Header from "./components/Header";
import Camera from "./components/Camera";
import React, { useState, useEffect } from "react";
import {
  Container,
  Alert,
  DropdownButton,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get_users();
  }, []);

  const get_users = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/get_users")
      .then((res) => res.json())
      .then((res) => setUsers(res))
      .then(() => setLoading(false));
  };

  return (
    <div>
      <Header />
      {loading ? (
        <p>loading...</p>
      ) : (
        <Container className="mt-4">
          <DropdownButton id="dropdown-basic-button" title="select user">
            {users.map((user) => (
              <Dropdown.Item onClick={() => setText(user.doc)} key={user.id}>
                {user.username}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Container>
      )}

      {text ? (
        <Container className="mt-4">
          <Row>
            <Col xs={8}>
              <Camera />
            </Col>
            <Col xs={4}>
              <Alert variant="secondary">{text}</Alert>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
