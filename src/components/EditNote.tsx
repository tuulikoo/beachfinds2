import React from "react";
import { useNavigate } from "react-router-dom";
import { PostData, Tag } from "../App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";
import { UPDATE_POST, CREATE_TAG } from "../operations/mutations";
import { useMutation } from "@apollo/client";
// Import your mutations from operations/mutations
// import { UPDATE_NOTE_MUTATION, CREATE_TAG_MUTATION } from "../operations/mutations";

type EditNoteProps = {
  availableTags: Tag[];
};

export function EditNote({ availableTags }: EditNoteProps) {
  const note = useNote();
  const navigate = useNavigate();
  const [updateNoteMutation] = useMutation(UPDATE_POST);
  const [createTagMutation] = useMutation(CREATE_TAG);

  // Placeholder function to handle note submission
  const onSubmit = async (noteData: PostData) => {
    // Here you would call your update note mutation with the updated note data
    console.log("Submitting edited note data:", noteData);
    const response = await updateNoteMutation({ variables: { id: note.id, data: noteData } });
    console.log(response);
    navigate("/");
  };

  // Placeholder function to handle adding a new tag
  const onAddTag = async (label: string) => {
    // Here you would call your create tag mutation
    console.log("Adding new tag:", label);
    const response = await createTagMutation({ variables: { label } });
    console.log(response);
    
  };

  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        description={note.description}
        tags={note.tags.map(tag => tag.id)} // Convert to string[] if necessary
        item_name={note.item_name}
        filename={note.filename}
        category={note.category}
        location={note.location}
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
