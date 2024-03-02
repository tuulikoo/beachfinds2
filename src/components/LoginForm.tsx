import React, { useState, FormEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void; // Define any additional props as needed
};

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onLogin(email, password);
        // Implement login logic or pass email and password to parent component
    };

    return (
        <Container className="mt-5">
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
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
