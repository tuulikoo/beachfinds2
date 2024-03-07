import React, { useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useMutation } from "@apollo/client";
import { CREATE_TAG} from "../operations/mutations";
import { PostData, Tag } from "../App";

type NoteFormProps = {
    onSubmit: (noteData: PostData, newTags?: SelectOption[]) => void;
    onAddTag?: (label: string) => void; 
    availableTags: Tag[];
    title?: string;
    description?: string;
    tags?: string[]; // If tags should be an array of IDs
    item_name?: string;
    filename?: string;
    category?: string;
    owner?: string; // Or User if it's an object
    location?: {
        type: string;
        coordinates: [number, number];
    };
    createDate?: string;
};

  type SelectOption = {
    label: string;
    value: string;
  }

// Assuming Tag and NoteData types are correctly defined elsewhere
export const NoteForm = ({ onSubmit, availableTags }: NoteFormProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);
    const [createTagMutation] = useMutation(CREATE_TAG);
    const nameRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    
    const tagOptions = availableTags.map(tag => ({ label: tag.label, value: tag.id }));
    
    const [filename, setFile] = useState<File | null>(null)
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

  // Function to handle new tag creation
  const handleCreateTag = async (inputValue: string) => {
    try {
        const response = await createTagMutation({
            variables: { label: inputValue },
        });
        const newTag = response.data.createTag;
        // Add the newly created tag to the selected tags
        setSelectedTags(prev => [...prev, { label: newTag.label, value: newTag.id }]);
    } catch (error) {
        console.error("Error creating tag:", error);
    }
};


const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    

    
    // Create the PostData object from form inputs
    const newPost: PostData = {
        title: titleRef.current?.value || "",
        item_name: nameRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        tags: selectedTags.map(tag => tag.value),
        filename: filename?.name || "",
        category: categoryRef.current?.value as 'Shells' | 'Seaglass' | 'Fossils' | 'Stones' | 'Driftwood' | 'Misc',
        location: {
            type: "Point",
            coordinates: [parseFloat(latitude), parseFloat(longitude)],
        },
    };
    console.log("New post: ", newPost);

    await onSubmit(newPost);
    
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
        <Stack gap ={4}>
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
                    <Form.Control required as= "textarea" ref={nameRef} rows={1} />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as= "textarea" ref={descriptionRef} rows={15} />
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
                    <Form.Group as={Row} className="mb-3">
            <Col>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter latitude"
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}
                />
            </Col>
            <Col>
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter longitude"
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                />
            </Col>
        </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                     <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
                     <p>{filename?.name}</p>
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type = "submit"
                    variant="primary">
                        Save
                        </Button>
                        <Link to ="..">
                    <Button type = "button"
                    variant="outline-secondary">
                        Cancel
                        </Button>
                        </Link>
                </Stack>

        </Stack>
    </Form>
    );
}
export default NoteForm;