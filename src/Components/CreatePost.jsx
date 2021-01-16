import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreatePost = () => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState([]);
  const [blogger, setBlogger] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() == '' || body.trim() == '') {
      return Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Something is Wrong',
        timer: 1500,
      });
    }
    try {
      let user_id = blogger;
      let data = {
        user_id,
        title,
        body,
      };
      let response = await axios({
        url: `https://gorest.co.in/public-api/users/${blogger}/posts`,
        method: 'post',
        data: data,
      });
      setTitle('');
      setBody('');
      console.log('res', response);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully Added',
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Something is Wrong',
        timer: 1500,
      });
    }
  };

  const getUser = async () => {
    try {
      let response = await axios({
        url: `https://gorest.co.in/public-api/users`,
        method: 'get',
      });
      setUsers(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className='text-center m-3'>Create New Post</h3>
        </Col>
        <Col>
          <Form.Group controlId='exampleForm.SelectCustom'>
            <Form.Label>Assign to a Blogger</Form.Label>
            <Form.Control
              as='select'
              custom
              onChange={(e) => setBlogger(e.target.value)}
            >
              <option value='' disabled hidden>
                Select a Blogger{' '}
              </option>
              {users.map((e, index) => (
                <option key={index} defaultValue={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Blog Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Blog Body</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button variant='secondary' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePost;
