import { Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { SimplifiedNote } from "./NoteList"
import { NoteCard } from "./NoteCard"
import { BlankSlate } from "./BlankSlate"

type NoteListBodyProps = {
  filteredNotes: SimplifiedNote[]
  title: string
}

export function NoteListBody({ filteredNotes, title }: NoteListBodyProps) {
  if (filteredNotes.length === 0 && title)
    return (
      <BlankSlate
        header='No notes found'
        body='Your search term did not match any notes.'
      />
    )
  if (filteredNotes.length === 0)
    return (
      <BlankSlate
        header='No notes yet'
        body='Create a new note to get started!'
      >
        <Link to='/new'>
          <Button variant='primary'>Create</Button>
        </Link>
      </BlankSlate>
    )
  return (
    <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
      {filteredNotes.map((note) => (
        <Col key={note.id}>
          <NoteCard id={note.id} title={note.title} tags={note.tags} />
        </Col>
      ))}
    </Row>
  )
}
