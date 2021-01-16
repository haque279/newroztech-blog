import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className='text-center m-3'>Blog Admin Dashboard</h3>
        </Col>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Hello Jane</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Welcome to Blog Admin Dashboard
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
