import React, { useState, FormEvent } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { RegisterForm } from './RegistrationForm';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void; // Define any additional props as needed
};

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control the modal display

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onLogin(email, password);
    };

    // Function to handle modal close
    const handleClose = () => setShowModal(false);
    // Function to handle modal show
    const handleShow = () => setShowModal(true);

    function handleRegister(email: string, password: string, user_name: string, country: string, city: string, contact: 'yes' | 'no'): void {
        console.log("Registering:", { email, password, user_name, country, city, contact });
        // Add your registration logic here
        handleClose(); // Close the modal after handling registration
    }


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
                    <RegisterForm onRegister={handleRegister}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
