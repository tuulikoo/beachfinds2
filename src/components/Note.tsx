import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_POST } from "../operations/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_LOCATION_BY_COORDINATES } from "../operations/queries";
import { useAuth } from "../types/AuthContext";


export function Note() {
  const [deletePost] = useMutation(DELETE_POST);
  const note = useNote();
  const navigate = useNavigate();
  const { token } = useAuth();

  const allNotes = useQuery(GET_ALL_POSTS);
  console.log("All notes: ", allNotes);

  const coordinatesDefined = note && note.location && note.location.coordinates.length === 2;
  const lat = coordinatesDefined ? note.location.coordinates[0] : null;
  const lng = coordinatesDefined ? note.location.coordinates[1] : null;

  const { data: locationData, loading: locationLoading, error: locationError } = useQuery(GET_LOCATION_BY_COORDINATES, {
    variables: { lat, lng },
    skip: !coordinatesDefined, // Skip the query if coordinates are not defined
  });

  //console.log("Location data continent: ", locationData.locationByCoordinates.town);
  if (locationLoading) return <div>Loading...</div>;
  if (locationError) return <div>Error! {locationError.message}</div>;

  const { continent, country, state, town } = locationData.locationByCoordinates;

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


  console.log("Note: ", note);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h3>Title: {note.title}</h3>
          <p>Category: {note.category}</p>
          <p>Owner: {note.owner.user_name}</p>
          <Link
            to={`/map?lat=${note.location.coordinates[0]}&lng=${note.location.coordinates[1]}`}
          >
            <p>Show on map</p>
          </Link>
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
     {locationData && locationData.locationByCoordinates && (
      <Row className="mt-4">
        <Col>
          <p>Location: {town}, {state}, {country}</p>
          <p>Continent: {continent}</p>
        </Col>
      </Row>
    )}
    </>
  );
}
