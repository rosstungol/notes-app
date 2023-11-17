import { Link } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import { NoteForm } from "./NoteForm"
import { NoteData, Tag } from "../App"

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <Row className='mb-4'>
        <Col>
          <h1>New Note</h1>
        </Col>
        <Col xs='auto' className='mt-2'>
          <Link
            to='https://www.markdownguide.org/cheat-sheet/'
            target='_blank'
            className='text-info'
          >
            Markdown Cheat Sheet
          </Link>
        </Col>
      </Row>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
