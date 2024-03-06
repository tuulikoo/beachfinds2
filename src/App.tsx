//App.tsx
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route, Navigate } from "react-router-dom"
import { Container } from "react-bootstrap";
import NewNote from "./components/NewNote";
import { NoteList } from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import { Note } from "./components/Note";
import { EditNote } from "./components/EditNote";
import { Navbar } from './components/Navbar';
import {LoginForm} from "./components/LoginForm";
import { EditUser } from "./components/EditUser";
import { useQuery } from "@apollo/client";
import { GET_ALL_TAGS } from "./operations/queries";



export type User = {
  id: string;
  user_name: string;
  email: string;
  country: string;
  city: string;
  contact: 'yes' | 'no';
  role: 'user' | 'admin';
  password: string;
};

export type Note = {
  id: string
} &NoteData

export type GetAllNotesQueryData = {
  posts: Note[];
};

export type PostData = {
  title: string;
  item_name: string;
  description: string;
  tags: string[];
  filename: string;
  category: 'Shells' | 'Seaglass' | 'Fossils' | 'Stones' | 'Driftwood' | 'Misc';
  location: {
      type: "Point"; 
      coordinates: [number, number]; 
  };
};

export type RawNote = {
  id: string
} &RawNoteData

export type RawNoteData = {
  title: string;
  item_name: string;
  description: string;
  filename: string; // Optional property for image name
  category:'Shells' | 'Seaglass' | 'Fossils' | 'Stones' | 'Driftwood' | 'Misc';
  owner: string | User
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  createDate: string;
  tags: string[];
};

export type NoteData = {
  id: string;
  title: string;
  item_name: string;
  description: string;
  tags: Tag[];
  filename: string; // Optional property for image name
  category:'Shells' | 'Seaglass' | 'Fossils' | 'Stones' | 'Driftwood' | 'Misc';
  owner: string | User;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  createDate: string;
};


export type UserData = {
  title: string;
  markdown: string;
  tags: Tag[];
  imageName?: string; // Optional property for image name
};

export type Tag = {
  id: string
  label: string
}

export type RawTag = {
  id: string
}

function App() {

  //onst notes = useQuery(GET_ALL_POSTS);
  const availableTags = useQuery(GET_ALL_TAGS);


  return (
    <Container className="my-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id" element={<NoteLayout />}>
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote availableTags={availableTags.data}/>} /> // Extract the 'data' property from 'availableTags'
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
