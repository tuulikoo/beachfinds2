import React, { useState, FormEvent } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Alert,
} from "react-bootstrap";
import { RegisterForm } from "./RegistrationForm";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../operations/mutations";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../types/AuthContext";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginMutation, { loading, error }] = useMutation(LOGIN_USER, {
    variables: {
      credentials: {
        username: email,
        password,
      },
    },
    onCompleted: (data) => {
      login(data.login);
      alert("You are logged in");
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error", error);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    loginMutation();
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container className="mt-5">
      {loading && <div>Loading...</div>}
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>

            <div className="mt-3">
              <p>Don't have an account yet?</p>
              <Button variant="secondary" onClick={handleShow}>
                Register here
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Registration Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
