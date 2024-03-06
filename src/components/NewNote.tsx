
import { NoteData, Tag } from "../App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  availableTags: Tag[];
  updateAvailableTags: (tag: Tag) => void;
};

export function NewNote({ onSubmit, availableTags, updateAvailableTags }: NewNoteProps) {
  // This function is intended to update the parent or global state with the newly created tag.
  // It gets called by NoteForm after a tag is successfully created and added to its state.
  const handleAddTag = (newTag: Tag) => {
    updateAvailableTags(newTag);
  };

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit} // Handles submitting the note
        onAddTag={handleAddTag} // Updates the parent or global state with a new tag
        availableTags={availableTags} // Passes down the list of available tags
      />
    </>
  );
}
