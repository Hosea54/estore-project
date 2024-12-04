import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
const Footer = () => {
    const currenyear = new Date().getFullYear()
  return (
   <footer>
    <Container>
        <Row>
            <Col className="text-center py-3">
              <p>ProShop &copy; {currenyear}</p>
            </Col>
        </Row>
    </Container>
   </footer>
  )
}

export default Footer
