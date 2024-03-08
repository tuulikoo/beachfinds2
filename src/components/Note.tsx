import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_POST } from "../operations/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../operations/queries";
import { useAuth } from "../types/AuthContext";

export function Note() {
  const [deletePost] = useMutation(DELETE_POST);
  const note = useNote();
  const navigate = useNavigate();

  const allNotes = useQuery(GET_ALL_POSTS);
  console.log("All notes: ", allNotes)

  const { token } = useAuth();

  const onDelete = (id: string) => {
    deletePost({
      variables: { id },
      refetchQueries: [{ query: GET_ALL_POSTS }],
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error deleting post:", error));
  };
  console.log("Note: ", note)

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>Item Name: {note.item_name}</h2>
          <h3>Title: {note.title}</h3>
          <p>Category: {note.category}</p>
          <p>Owner: {note.owner.user_name}</p>
          <p>Filename: {note.filename}</p>
        
          <p>
            Location: Latitude {note.location.coordinates[1]}, Longitude{" "}
            {note.location.coordinates[0]}
          </p>
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
              <Button variant="primary" disabled={!token}>
                Edit
              </Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => onDelete(note.id)}
              disabled={!token}
            >
              Delete
            </Button>
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
          <img
            src={`http://localhost:3002/api/v1/upload/${note.filename}`}
            alt={note.item_name}
            style={{ maxWidth: "100%" }}
/>
          </Col>
        </Row>
      )}
    </>
  );
}
