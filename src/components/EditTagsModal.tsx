import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../App"

type EditTagsModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

export function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onUpdateTag,
  onDeleteTag
}: EditTagsModalProps) {
  const modalBody =
    availableTags.length > 0 ? (
      availableTags.map((tag) => {
        return (
          <Row key={tag.id}>
            <Col>
              <Form.Control
                type='text'
                value={tag.label}
                onChange={(e) => onUpdateTag(tag.id, e.target.value)}
              />
            </Col>
            <Col xs='auto'>
              <Button
                variant='outline-danger'
                onClick={() => onDeleteTag(tag.id)}
              >
                &times;
              </Button>
            </Col>
          </Row>
        )
      })
    ) : (
      <span>No tags yet.</span>
    )

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <h5 className='my-1'>Edit Tags</h5>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>{modalBody}</Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
