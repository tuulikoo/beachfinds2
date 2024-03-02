import { useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4} from "uuid";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>


export function NoteForm({ 
    onSubmit, 
    onAddTag, 
    availableTags, 
    title = "", 
    markdown = "", 
    tags = []
}: NoteFormProps){
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const [image, setImage] = useState<File | null>(null)
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Construct the submission data
        const submissionData: NoteData & { imageName?: string } = {
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        };

        // If an image has been selected, include its name in the submission data
        if (image) {
            submissionData.imageName = image.name;
        }

        onSubmit(submissionData);

        navigate("..");
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
        }
    };


    return (

     <Form onSubmit={handleSubmit}>
        <Stack gap ={4}>
            <Row>
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={titleRef} required defaultValue = {title} />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <CreatableReactSelect 
                    onCreateOption={label => {
                        const newTag = { id: uuidV4(), label}
                        onAddTag(newTag)
                        setSelectedTags(prev => [...prev, newTag])
                    }}
                    value = {selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id}
                    })}
                    options={availableTags.map(tag => {
                        return { label: tag.label, value: tag.id}
                    })}
                    onChange={tags => {
                        setSelectedTags(tags.map(tag => {
                            return {label: tag.label, id: tag.value}
                        }))
                    }}
                    isMulti/>
                </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control defaultValue = {markdown} required as= "textarea" ref={markdownRef} rows={15} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                     <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
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
    )
}
