import React, { useEffect, useState } from 'react';
import {getBoardDetails,setBoardDetails} from '../../utils/Storage'
import { Navbar, Nav, NavDropdown ,Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateBoardModal from '../../components/Model';
import {RandomId} from '../../utils/RandomId'


const Sidebar = () => {
  const [showModal,setShowModal] = useState(false)
  const [allBoard,setAllBoard] = useState([])
  const [boardName,setBoardName] = useState('')

  const createBoardHandler = ()=>{
    setShowModal(true)
  }

  const handleCreateClick = () =>{
    let randomId = RandomId(4)
    let new_board = {name:boardName,id:randomId,list:[]}
    setBoardDetails(new_board)
    setShowModal(false)
    setBoardName(false)
  }
  
  useEffect(()=>{
    const board_data = getBoardDetails()
    setAllBoard(board_data)
  },[])

  return (
    <React.Fragment>
    <Navbar bg="dark" variant="dark" className="sidebar">
      <Nav className="flex-column">
        <Link to="/" className="navbar-brand">Task Board</Link>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <NavDropdown title="Boards" id="nav-dropdown">
          { allBoard.length > 0 &&
            allBoard.map((item,index)=>{
              return(
                <NavDropdown.Item key={index} as={Link} to={`/board/${item.id}`}>{item.name}</NavDropdown.Item>
              )
            })
          }
          <NavDropdown.Item onClick={createBoardHandler}>Create Board</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
    <CreateBoardModal title="Create New board" show={showModal} onClose={() => setShowModal(false)
    }>
      <Form.Group controlId="boardName">
          <Form.Label>Board Name</Form.Label>
          <Form.Control
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Enter board name"
          />
      </Form.Group>
      <Button variant="primary" className="mt-3" onClick={handleCreateClick}>Create Board</Button>
    </CreateBoardModal>
    </React.Fragment>
  );
};

export default Sidebar;
