//App.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./components/NewNote";
import { NoteList } from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import { Note } from "./components/Note";
import { EditNote } from "./components/EditNote";
import { Navbar } from "./components/Navbar";
import { LoginForm } from "./components/LoginForm";
import { EditUser } from "./components/EditUser";
import { useQuery } from "@apollo/client";
import { GET_ALL_TAGS, GET_ALL_POSTS } from "./operations/queries";
import MapShow from "./components/MapComponent";
import { AllUsers } from "./components/AllUsers";

export type User = {
  id: string;
  user_name: string;
  email: string;
  country: string;
  city: string;
  contact: "yes" | "no";
  role: "user" | "admin";
  password: string;
};

export type Note = {
  id: string;
} & NoteData;

export type GetAllNotesQueryData = {
  posts: Note[];
};

export type PostData = {
  title: string;
  item_name: string;
  description: string;
  tags: string[];
  filename: string;
  category: "Shells" | "Seaglass" | "Fossils" | "Stones" | "Driftwood" | "Misc";
  location: {
    type: "Point";
    coordinates: [number, number];
  };
};
export type RawPostData = {
  id: string;
  title: string;
  item_name: string;
  description: string;
  tags: string[];
  filename: string;
  category: "Shells" | "Seaglass" | "Fossils" | "Stones" | "Driftwood" | "Misc";
  location: {
    type: "Point";
    coordinates: [number, number];
  };
};

export type NoteData = {
  id: string;
  title: string;
  item_name: string;
  description: string;
  tags: Tag[];
  filename: string; // Optional property for image name
  category: "Shells" | "Seaglass" | "Fossils" | "Stones" | "Driftwood" | "Misc";
  owner: User;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
};

export type UserData = {
  title: string;
  markdown: string;
  tags: Tag[];
  imageName?: string; // Optional property for image name
};

export type Tag = {
  id: string;
  label: string;
};

export type RawTag = {
  id: string;
};

function App() {
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery(GET_ALL_TAGS);
  const {
    data: postData,
    loading: postsLoading,
    error: postsError,
  } = useQuery(GET_ALL_POSTS);
  console.log("tagsData", tagsData);
  if (tagsLoading || postsLoading) return <p>Loading...</p>;
  if (tagsError) return <p>Error loading tags: {tagsError.message}</p>;
  if (postsError) return <p>Error loading posts: {postsError.message}</p>;

  return (
    <Container className="my-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/map" element={<MapShow postData={postData} />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id" element={<NoteLayout />}>
          <Route index element={<Note />} />
          <Route
            path="edit"
            element={<EditNote availableTags={tagsData.allTags} />}
          />{" "}
          // Extract the 'data' property from 'availableTags'
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Users" element={<AllUsers />} />
      </Routes>
    </Container>
  );
}

export default App;
