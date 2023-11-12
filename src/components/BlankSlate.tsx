import { Link } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
import noNote from "../assets/images/file-search.svg"

type BlankSlateProps = {
  header: string
  body: string
}

export function BlankSlate({ header, body }: BlankSlateProps) {
  return (
    <Row className='justify-content-center my-5 py-5'>
      <Col xs='auto' className='text-center'>
        <img src={noNote} className='my-3' />
        <h3>{header}</h3>
        <p>{body}</p>

        <Link to='/new'>
          <Button variant='primary'>Create</Button>
        </Link>
      </Col>
    </Row>
  )
}
