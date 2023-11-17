import { useMemo, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect, { CSSObjectWithLabel } from "react-select"
import { NoteListBody } from "./NoteListBody"
import { EditTagsModal } from "./EditTagsModal"
import { Tag } from "../App"

export type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

export function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLowerCase())) &&
        (setSelectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  const disabledSearchInput = notes.length === 0 && true
  const disabledSelect: CSSObjectWithLabel = {
    backgroundColor: "#e9ecef"
  }
  const customSelectStyles: CSSObjectWithLabel = {
    borderColor: "#dee2e6",
    borderRadius: "6px"
  }

  return (
    <>
      <Row className='mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto' className='mt-2'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button
              variant='outline-secondary'
              onClick={() => setEditTagsModalIsOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form className='mb-4'>
        <h6>Search</h6>
        <Row xs={1} lg={2}>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={disabledSearchInput}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
                isDisabled={disabledSearchInput}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    ...customSelectStyles,
                    ...(state.isDisabled && disabledSelect)
                    //
                  })
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <NoteListBody filteredNotes={filteredNotes} title={title} />

      <EditTagsModal
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  )
}
