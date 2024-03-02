import React from "react";
import { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

type RegisterFormProps = {
    onRegister: (email: string, password: string, user_name: string, country: string, city: string, contact: 'yes' | 'no') => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({onRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_name, setUser_name] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState<'yes' | 'no'>('no');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onRegister(email, password, user_name, country, city, contact);
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
                                onChange={(e) => setContact(e.target.value as 'yes' | 'no')}
                                required>
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
