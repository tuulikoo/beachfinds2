import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_POST } from "../operations/mutations";
import { useMutation } from "@apollo/client";

// Assuming `owner` is a User type with a user_name property
// and `tags` is an array of strings

export function Note() {

    const [deletePost] = useMutation(DELETE_POST);

    const onDelete = (id: string) => {
        // Use the mutation function with the correct variables
        deletePost({ variables: { id } }).then(() => {
            // After deletion, navigate back to the home page or refresh the list
            // This assumes you have error handling elsewhere or in the mutation definition
            navigate("/");
        });
    };

    const note = useNote();
    const navigate = useNavigate();

    

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h2>Item Name: {note.item_name}</h2>
                    <h3>Title: {note.title}</h3>
                    <p>Category: {note.category}</p>
                    <p>Owner: "TO BE ADDED"</p>
                    <p>Location: Latitude {note.location.coordinates[1]}, Longitude {note.location.coordinates[0]}</p>
                    <p>Created Date: {note.createDate}</p>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.tags.map((tag) => (
                                <Badge className="text-truncate" key={tag.id}>
                                {tag.label}
                            </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/edit/${note.id}`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button onClick={() => { onDelete(note.id); navigate("/"); }} variant="outline-danger">Delete</Button>
                        <Link to="/">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>

            <p>Description: {note.description}</p>
            {note.filename && (
                <Row className="mt-4">
                    <Col>
                        {/* Assuming you have a way to access the image, like a path or URL */}
                        <img src={`/path/to/image/${note.filename}`} alt={note.item_name} style={{maxWidth: '100%'}} />
                    </Col>
                </Row>
            )}
        </>
    );
}
