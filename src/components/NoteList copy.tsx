import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import ReactSelect from "react-select";
import { Tag } from "../App";
import styles from "./NoteList.module.css"
import { GET_ALL_POSTS, GET_ALL_TAGS } from "../operations/queries";
import {  useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { DELETE_TAG, UPDATE_TAG } from "../operations/mutations";
import { NoteData } from "../App";



    //onDeleteTag: (id: string) => void
    //onUpdateTag: (id: string, label: string) => void


type SimplifiedNote = {
    tags: Tag[]
    title: string
    item_name: string
    filename: string
    id: string

}

type EditTagsModalProps = {
    availableTags: Tag[]
    handleClose: () => void
    show: boolean
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

export function NoteList() {
    const { loading: loadingPosts, error: errorPosts, data: dataPosts } = useQuery(GET_ALL_POSTS);
    const { loading: loadingTags, error: errorTags, data: dataTags } = useQuery(GET_ALL_TAGS);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);
    const [deleteTagMutation] = useMutation(DELETE_TAG);
    const [updateTagMutation] = useMutation(UPDATE_TAG);


    // Assuming notes are now directly fetched from the query and not passed as props
    const notes = useMemo(() => dataPosts?.posts || [], [dataPosts]);
    const availableTags = useMemo(() => dataTags?.allTags || [], [dataTags]);

    const filteredNotes = useMemo(() => {
        return notes.filter((note: SimplifiedNote) => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
            && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)));
        });
    }, [notes, selectedTags, title]);


    if (loadingPosts || loadingTags) return <p>Loading...</p>;
    if (errorPosts || errorTags) return <p>Error loading data</p>;

    const onDeleteTag = async (tagId: string) => {
        try {
          await deleteTagMutation({
            variables: { id: tagId },
            refetchQueries: [{ query: GET_ALL_TAGS }], // Optionally, refetch the tags after deletion
          });
          console.log("Tag deleted successfully");
        } catch (error) {
          console.error("Error deleting tag:", error);
        }
      };
      
      const onUpdateTag = async (tagId: string, newLabel: string) => {
        try {
          await updateTagMutation({
            variables: { id: tagId, label: newLabel },
            refetchQueries: [{ query: GET_ALL_TAGS }], // Optionally, refetch the tags after update
          });
          console.log("Tag updated successfully");
        } catch (error) {
          console.error("Error updating tag:", error);
        }
      };

    return (
    <>
    <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
            <Stack gap={2} direction="horizontal">
                <Link to="/new">
                    <Button variant="primary">Create</Button>
                </Link>
                <Button onClick={() => setEditTagsModalIsOpen(true)}
                variant="outline-secondary">Edit Tags</Button>
            </Stack>
        </Col>
        </Row>
        <Form>
            <Row className="mb-4">
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <ReactSelect 
                    value = {selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id}
                    })}
                    options={availableTags.map((tag: Tag) => {
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
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filteredNotes.map((note: NoteData) => (
                <Col key = {note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags} item_name={note.item_name} filename={note.filename}/>
                 </Col>
            ))}
        </Row>
        <EditTagsModal 
        onUpdateTag = {onUpdateTag} 
        onDeleteTag={onDeleteTag}
         show={editTagsModalIsOpen} 
         handleClose={() => setEditTagsModalIsOpen(false)} 
         availableTags={availableTags}/>
        </>
    )
}
function NoteCard({id, title, tags}: SimplifiedNote){
    return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className="align-items-center justify-content-center h-100">
                <span className="fs-5">{title}</span>
                {tags.length > 0 && (
                    <Stack gap = {1} direction="horizontal"
                        className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                <Badge className="text-trunccate" 
                                key ={tag.id}>
                                    {tag.label}
                                    </Badge>
                            ))}
                            </Stack>
                )}
                </Stack>
        </Card.Body>
    </Card>
}

function EditTagsModal({
availableTags, 
handleClose, 
show,
onDeleteTag,
onUpdateTag,}: EditTagsModalProps) {
    return <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availableTags.map(tag => (
                        <Row key = {tag.id}>
                            <Col>
                            <Form.Control type= "text"value={tag.label} onChange={e => onUpdateTag(tag.id, e.target.value)}/>
                            </Col>
                            <Col xs ="auto">
                                <Button onClick={() => onDeleteTag(tag.id)}
                                variant="outline-danger">&times;</Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
            
    </Modal>
}