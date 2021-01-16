import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Loader from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bloggers = () => {
  const [allBlogers, setAllBlogers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const getBlogers = async () => {
    try {
      setLoading(true);
      let response = await axios({
        url: `https://gorest.co.in/public-api/users?page=${activePage}`,
        method: 'get',
      });
      setAllBlogers(response.data.data);
      setLimit(response.data.meta.pagination.limit);
      setTotalItems(response.data.meta.pagination.total);
      setLoading(false);
    } catch (error) {}
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  useEffect(() => {
    getBlogers();
  }, [activePage]);

  {
    if (loading) {
      return (
        <div className='loader'>
          <Loader type='Puff' color='#00BFFF' height={100} width={100} />
        </div>
      );
    } else {
      return (
        <Container>
          <Row>
            <Col md={12}>
              <h3 className='text-center m-3'>All Bloggers</h3>
            </Col>

            {allBlogers.map((user, index) => (
              <Col md={4} key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      {user.email}
                    </Card.Subtitle>
                    <Link to={`/posts/${user.id}`}>View Post</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col md={12}>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={limit}
                totalItemsCount={totalItems}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            </Col>
          </Row>
        </Container>
      );
    }
  }
};

export default Bloggers;
