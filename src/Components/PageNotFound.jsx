import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';

const PageNotFound = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>404! </Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Page Not found
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
