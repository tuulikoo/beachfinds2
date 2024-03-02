import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteProps = {
    onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.tags.map(tag => (
                                <Badge className="text-truncate" key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.id}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button onClick={() => {
                            onDelete(note.id);
                            navigate("/");
                        }}
                        variant="outline-danger">Delete</Button>
                        <Link to="/">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>

            <ReactMarkdown>{note.markdown}</ReactMarkdown>

            {/* Conditionally render the image name or an image preview */}
            {note.imageName && (
                <Row className="mt-4">
                    <Col>
                        {/* Display the image name */}
                        <p>Image: {note.imageName}</p>
                        {/* If you want to display the image instead, you'll need the actual image URL */}
                        {/* <img src={URL_of_the_image} alt="Uploaded Image" className="img-fluid" /> */}
                    </Col>
                </Row>
            )}
        </>
    );
}
