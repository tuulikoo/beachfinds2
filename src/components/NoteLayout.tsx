import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../operations/queries";
import { Note } from "../App"; // Ensure this import is correct based on where your Note type is defined

export function NoteLayout() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const note: Note | undefined = data.posts.find((n: Note) => n.id === id);

  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
}

export function useNote(): Note {
  return useOutletContext<Note>();
}
