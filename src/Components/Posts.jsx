import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const Posts = () => {
  const { id } = useParams();
  const [allPosts, setAllPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPosts = async () => {
    setLoading(true);
    try {
      let response = await axios({
        url: `https://gorest.co.in/public-api/users/${id}/posts`,
        method: 'get',
      });
      setAllPost(response.data.data);
    } catch (error) {}
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return (
      <div className='loader'>
        <Loader type='Puff' color='#00BFFF' height={100} width={100} />
      </div>
    );
  } else {
    return (
      <Container>
        {allPosts.length > 0 ? (
          <Row>
            <Col md={12}>
              <h3 className='text-center m-3'>Blogger Post</h3>
            </Col>
            {allPosts.map((item, index) => (
              <Col key={index} md={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <div className='text-right'>
                      <Link to={`/post-details/${item.id}`}>View Details</Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div>
            <h4 className='text-center'>No Post found</h4>
          </div>
        )}
      </Container>
    );
  }
};

export default Posts;
