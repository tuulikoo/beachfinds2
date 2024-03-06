import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../operations/queries";
import { Note } from "../App"; // Ensure this import is correct based on where your Note type is defined

export function NoteLayout() {
    // Fetch all posts
    const { loading, error, data } = useQuery(GET_ALL_POSTS);

    const { id } = useParams();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Ensure that the `data.posts` array is typed correctly, here assumed to be `Note[]`
    const note: Note | undefined = data.posts.find((n: Note) => n.id === id);

    if (note == null) return <Navigate to="/" replace />;

    return <Outlet context={note} />;
}

export function useNote() {
    // You might need to specify the type expected to be returned here as well
    return useOutletContext<Note>();
}
