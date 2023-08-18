import React from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './SideBar'

const AuthLayout = () => {
  return (
    <React.Fragment>
      <Row className='m-0'>
        <Col md={{span:2}} className='p-0'>
          <Sidebar/>
        </Col>
        <Col md={{span:10}}>
          <h3>Welcome</h3>
          <Container>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AuthLayout;
