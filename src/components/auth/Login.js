import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate,NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const {login} = useAuth()
  const navigate  = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (username !== '' || password !== ''){
        const response = await login(username,password);
        if (response){
          navigate('/dashboard')
        } else {
          setErrorMessage(response.message);
        }
      } else {
        setErrorMessage('Credentials is required');
      }

    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container fluid="md">
      <Row>
        <Col md={{span:4,offset:4}} className='mt-5'>
          <h2>Login</h2>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group controlId="password" className='mt-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </Form.Group>
            {errorMessage && <p variant="danger">{errorMessage}</p>}
            <Row className='mt-4'>
              <Col md={{span:6}}>
                <Button variant="primary" onClick={handleLogin}>Login</Button>
              </Col>
              <Col md={{span:6}}>
                <NavLink to='/register'>Register</NavLink>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
