import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { CommentsContext } from '../contexts/CommentsContext';
import Swal from 'sweetalert2';

const PostDetails = () => {
  const [adminComment, setAdminComment] = useState('');
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { fetchComments, comments, addComment } = useContext(CommentsContext);
  const getPosts = async () => {
    try {
      let response = await axios({
        url: `https://gorest.co.in/public-api/posts/${id}`,
        method: 'get',
      });
      setPost(response.data.data);
    } catch (error) {}
  };
  const getComment = async () => {
    try {
      let response = await axios({
        url: `https://gorest.co.in/public-api/posts/${id}/comments`,
        method: 'get',
      });
      fetchComments(response.data.data);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (adminComment.trim() == '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Something is Wrong!',
          timer: 1500,
        });
      } else {
        let response = await axios({
          url: `https://gorest.co.in/public-api/posts/${id}/comments`,
          method: 'post',
          data: {
            post_id: id,
            user_id: 178,
            name: 'jane',
            email: 'jane@me.com',
            body: adminComment,
          },
        });
        addComment(response.data.data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Added',
          timer: 1500,
        });
        setAdminComment('');
      }
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Something is Wrong!',
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    getPosts();
    getComment();
  }, []);
  return (
    <Container>
      <Row>
        <Col md={12}>
          {post ? (
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>

                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            'no post found'
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Post a Comment </h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              as='textarea'
              rows={3}
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button variant='secondary' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
        </Col>
      </Row>
      {comments.length > 0 ? (
        <>
          <Row>
            <Col>
              <h5>All Comments </h5>
            </Col>
          </Row>
          <Row>
            {comments.map((item, index) => (
              <Col key={index} md={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      {item.email}
                    </Card.Subtitle>
                    <Card.Text>{item.body}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : null}
    </Container>
  );
};

export default PostDetails;
