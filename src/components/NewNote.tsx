import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_ALL_TAGS } from "../operations/queries";
import { CREATE_POST } from "../operations/mutations";
import { useMutation } from "@apollo/client";
import NoteForm from "./NoteForm";
import { PostData } from "../App";

const NewNote = () => {
  const { loading, error, data } = useQuery(GET_ALL_TAGS);
  const [createPostMutation] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const handleSubmit = async (noteData: PostData) => {
    createPostMutation({ variables: { input: noteData } });
  };

  if (loading) return <p>Loading tags...</p>;
  if (error) return <p>Error fetching tags: {error.message}</p>;

  return (
    <div>
      <h1>Add a new salty treasure</h1>
      <NoteForm onSubmit={handleSubmit} availableTags={data.allTags} />
    </div>
  );
};

export default NewNote;
