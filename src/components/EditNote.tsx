import { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import CreatableSelect from "react-select/creatable";
import { GET_POST_BY_ID } from "../operations/queries";
import { UPDATE_POST } from "../operations/mutations";
import { Tag } from "../types/DBtypes";

type SelectOption = { label: string; value: string };

type EditNoteProps = {
  availableTags: Tag[];
};

export const EditNote = ({ availableTags }: EditNoteProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateNote] = useMutation(UPDATE_POST);
  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { id },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [item_name, setItemName] = useState("");
  const [category, setCategory] = useState("");

  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);

  const tagOptions = availableTags.map((tag) => ({
    label: tag.label,
    value: tag.id,
  }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialData, setInitialData] = useState({
    title: "",
    description: "",
    item_name: "",
    category: "",
    tags: [] as SelectOption[],
  });
  console.log(initialData);

  useEffect(() => {
    if (data && data.postById) {
      const post = data.postById;
      const fetchedTags = post.tags.map((tag: Tag) => ({
        label: tag.label,
        value: tag.id,
      }));
      setTitle(post.title);
      setDescription(post.description);
      setItemName(post.item_name);
      setCategory(post.category);
      setSelectedTags(fetchedTags);
      setInitialData({
        title: post.title,
        description: post.description,
        item_name: post.item_name,
        category: post.category,
        tags: fetchedTags,
      });
    }
  }, [data]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const tagIds = selectedTags.map((tag) => tag.value); // Convert selectedTags back to an array of tag ids
    try {
      await updateNote({
        variables: {
          id,
          input: {
            title,
            description,
            item_name,
            category,
            tags: tagIds,
          },
        },
      });
      navigate(-1);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="title">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="tags">
          <Form.Label column sm={2}>
            Tags
          </Form.Label>
          <Col sm={10}>
            <CreatableSelect
              isMulti
              onChange={(value) => setSelectedTags(value as SelectOption[])}
              options={tagOptions.map((tag) => ({
                label: tag.label,
                value: tag.value.toString(),
              }))}
              value={selectedTags}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="item_name">
          <Form.Label column sm={2}>
            Item name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="description">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Note
        </Button>
      </Form>
    </>
  );
};
export default EditNote;
