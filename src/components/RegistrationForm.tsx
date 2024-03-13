import React from "react";
import { FormEvent, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../operations/mutations";

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUser_name] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState<"yes" | "no">("no");

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    variables: {
      user: {
        email,
        password,
        user_name,
        country,
        city,
        contact,
      },
    },
    onCompleted: (data) => {
      console.log("Registration successful", data);
      alert("You are registered");
    },
    onError: (error) => {
      console.error("Registration error", error);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    registerUser();
  };
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

            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                value={user_name}
                onChange={(e) => setUser_name(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>Public details</Form.Label>
              <Form.Select
                value={contact}
                onChange={(e) => setContact(e.target.value as "yes" | "no")}
                required
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
