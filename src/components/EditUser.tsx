import React, { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../operations/mutations";
import { GET_USER_DETAILS } from "../operations/queries";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../types/AuthContext";



interface UserDetails {
    email: string;
    user_name: string;
    country: string;
    city: string;
    contact: 'yes' | 'no';
}

export const EditUser: React.FC = () => {
    const [userData, setUserData] = useState<UserDetails>({
        email: '',
        user_name: '',
        country: '',
        city: '',
        contact: 'no',
    });
    const [editing, setEditing] = useState(false);

    const { user } = useAuth();
    const userId = user?.id;
    console.log("userid in editing", userId)


    const { loading: fetchLoading, error: fetchError, data: fetchUserData } = useQuery(GET_USER_DETAILS, {
        variables: { id: userId }, // Pass userId as a variable to the query
      });

    useEffect(() => {
    if (fetchUserData && fetchUserData.getCurrentUser) {
        const { email, user_name, country, city, contact } = fetchUserData.getCurrentUser;
        setUserData({ email, user_name, country, city, contact });
    }
}, [fetchUserData]);

const [updateUserDetails, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USER_DETAILS, variables: { id: userId } }],
});
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const updatedUserData: UserDetails = { ...userData };
    
        // Update email if it's empty
        if (!userData.email) {
            updatedUserData.email = user?.email || ''; // Fallback to user.email if available
        }
    
        // Update user_name if it's empty
        if (!userData.user_name) {
            updatedUserData.user_name = user?.user_name || ''; // Fallback to user.user_name if available
        }
    
        // Update country if it's empty
        if (!userData.country) {
            updatedUserData.country = user?.country || ''; // Fallback to user.country if available
        }
    
        // Update city if it's empty
        if (!userData.city) {
            updatedUserData.city = user?.city || ''; // Fallback to user.city if available
        }
    
        // Update contact if it's empty
        if (!userData.contact) {
            updatedUserData.contact = user?.contact || 'no'; // Fallback to user.contact if available
        }
    
        console.log("Updated userData:", updatedUserData);
    
        updateUserDetails({
            variables: {
                user: updatedUserData,
            },
        }).then(() => {
            alert("Details updated successfully");
            fetchUserData.refetch(); // Refetch the user details
            navigate("/"); // Navigate to home page
        }).catch(error => {
            console.log('Error updating user', error);
        });
    };
    

    return (
        <Container className="mt-5">
            {fetchLoading && <div>Loading...</div>}
            {fetchError && <Alert variant="danger">{fetchError.message}</Alert>}
            {updateError && <Alert variant="danger">{updateError.message}</Alert>}
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={user?.email}
                                value={userData.email}
                                onChange={(e) => setUserData(prevUserData => ({ ...prevUserData, email: e.target.value }))}
                                disabled={!editing} // Disable if not editing
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicusername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user?.user_name}
                                value={userData.user_name}
                                onChange={(e) => setUserData(prevUserData => ({ ...prevUserData, user_name: e.target.value }))}
                                disabled={!editing} // Disable if not editing
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user?.country}
                                value={userData.country}
                                onChange={(e) => setUserData(prevUserData => ({ ...prevUserData, country: e.target.value }))}
                                disabled={!editing} // Disable if not editing
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user?.city}
                                value={userData.city}
                                onChange={(e) => setUserData(prevUserData => ({ ...prevUserData, city: e.target.value }))}
                                disabled={!editing} // Disable if not editing
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicContact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Enable Contact"
                                checked={userData.contact === 'yes'}
                                onChange={(e) => setUserData(prevUserData =>({ ...prevUserData, contact: e.target.checked ? 'yes' : 'no' }))}
                                disabled={!editing} // Disable if not editing
                            />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={() => setEditing(!editing)}>
                            {editing ? 'Cancel' : 'Edit'} {/* Toggle edit button text */}
                        </Button>
                        {editing && ( // Render save button only when editing
                            <Button variant="success" type="submit" disabled={updateLoading}>
                                {updateLoading ? 'Updating...' : 'Save'}
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
