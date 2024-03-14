import React, { useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useMutation } from "@apollo/client";
import { CREATE_TAG } from "../operations/mutations";
import { PostData, Tag } from "../App";
import { useAuth } from "../types/AuthContext";
import { fetchFromOpenCage } from "../functions/locationDetails";

type NoteFormProps = {
  onSubmit: (noteData: PostData, newTags?: SelectOption[]) => void;
  onAddTag?: (label: string) => void;
  availableTags: Tag[];
  title?: string;
  description?: string;
  tags?: string[];
  item_name?: string;
  filename?: string;
  category?: string;
  owner?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  createDate?: string;
};

type SelectOption = {
  label: string;
  value: string;
};

export const NoteForm = ({ onSubmit, availableTags }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);
  const [createTagMutation] = useMutation(CREATE_TAG);
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const authContext = useAuth();
  const token = authContext.token;

  const tagOptions = availableTags.map((tag) => ({
    label: tag.label,
    value: tag.id,
  }));

  const [filename, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  // Function to handle new tag creation
  const handleCreateTag = async (inputValue: string) => {
    try {
      const response = await createTagMutation({
        variables: { label: inputValue },
      });
      const newTag = response.data.createTag;
      // Add the newly created tag to the selected tags
      setSelectedTags((prev) => [
        ...prev,
        { label: newTag.label, value: newTag.id },
      ]);
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!filename) {
      console.error("No file selected for upload.");
      return;
    }
    const formData = new FormData();
    formData.append("image", filename);

    try {
      const uploadResponse = await fetch(
        `https://beachfinds-uploadserver.azurewebsites.net/api/v1/upload/`,
        //`http://localhost:3002/api/v1/upload/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }

      const uploadResult = await uploadResponse.json();
    
      const imgcoordinates: number[] = uploadResult.data.location.coordinates;
      const finalFilename: string = `${uploadResult.data.filename}.png`;

      // Create the PostData object from form inputs
      const newPost: PostData = {
        title: titleRef.current?.value || "",
        item_name: nameRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        tags: selectedTags.map((tag) => tag.value),
        filename: finalFilename,
        category: categoryRef.current?.value as
          | "Shells"
          | "Seaglass"
          | "Fossils"
          | "Stones"
          | "Driftwood"
          | "Misc",
        location: {
          type: "Point",
          coordinates: [imgcoordinates[0], imgcoordinates[1]],
          //coordinates: [parseFloat(latitude), parseFloat(longitude)],
        },
      };
      console.log("New post: ", newPost);
      console.log(
        "Calling processLocationDetails with coordinates:",
        imgcoordinates[0],
        imgcoordinates[1]
      );
      try {
        await fetchFromOpenCage(imgcoordinates[0], imgcoordinates[1]);
        console.log("Location details processed successfully.");
      } catch (error) {
        console.error("Error processing location details:", error);
      }

      await onSubmit(newPost);

      navigate("..");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Function to handle image file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                isMulti
                onChange={(newValue) => setSelectedTags([...newValue])}
                options={tagOptions}
                value={selectedTags}
                onCreateOption={handleCreateTag}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="itemname">
          <Form.Label>ItemName</Form.Label>
          <Form.Control required as="textarea" ref={nameRef} rows={1} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control required as="textarea" ref={descriptionRef} rows={15} />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Category select" ref={categoryRef}>
            <option value="Shells">Shells</option>
            <option value="Seaglass">Seaglass</option>
            <option value="Fossils">Fossils</option>
            <option value="Stones">Stones</option>
            <option value="Driftwood">Driftwood</option>
            <option value="Misc">Misc</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <p>{filename?.name}</p>
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="/">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};
export default NoteForm;
